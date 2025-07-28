'use server';

/**
 * @fileOverview Server-side actions for handling page data in Firestore.
 * These functions are called by client components to interact with the database.
 * They use the shared `db` instance from `@/lib/firebase` to ensure a single
 * point of database connection.
 */

import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, Timestamp, query, where, orderBy } from 'firebase/firestore';
import type { BuilderState } from '@/types';

interface SavePageDataParams {
    userId: string;
    pageId?: string | null;
    pageName: string;
    siteContent: string; // The JSON string of the BuilderState
}

// Function to save or update page data
export async function savePageData({ userId, pageId, pageName, siteContent }: SavePageDataParams) {
    if (!userId || !pageName || !siteContent) {
        throw new Error("Faltan datos requeridos para guardar la página.");
    }

    try {
        // If no pageId is provided, generate a new one
        const idToUse = pageId || doc(collection(db, `users/${userId}/pages`)).id;

        const pageRef = doc(db, `users/${userId}/pages`, idToUse);
        const pageDataToSave = {
            name: pageName,
            content: siteContent, // Store content as a JSON string
            updatedAt: Timestamp.now(),
            ...( !pageId ? { createdAt: Timestamp.now() } : {} ) // Add createdAt only if it's a new page
        };
        
        await setDoc(pageRef, pageDataToSave, { merge: true });

        return { success: true, pageId: idToUse, message: `Página "${pageName}" guardada correctamente.` };
    } catch (error) {
        console.error("Error al guardar la página: ", error);
        if (error instanceof Error) {
           throw new Error(`No se pudo guardar la página: ${error.message}`);
        }
        throw new Error("Ocurrió un error desconocido al guardar los datos de la página.");
    }
}


// Function to get a list of all pages for a user
export async function getUserPages(userId: string) {
    if (!userId) return null;
    try {
        const pagesCollectionRef = collection(db, `users/${userId}/pages`);
        const q = query(pagesCollectionRef, orderBy('updatedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const pages = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                // Convert Firestore Timestamp to a serializable format (ISO string)
                updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
                createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
            }
        });

        return pages;
    } catch (error) {
        console.error("Error al obtener las páginas del usuario: ", error);
        return null;
    }
}

// Function to get the content of a single page
export async function getPageData(userId: string, pageId: string) {
    if (!userId || !pageId) return null;
    try {
        const pageRef = doc(db, `users/${userId}/pages`, pageId);
        const docSnap = await getDoc(pageRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                name: data.name,
                content: data.content, // content is already a JSON string
                updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString(),
            };
        } else {
            console.log("No se encontró tal documento!");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener datos de la página: ", error);
        return null;
    }
}

// Function to delete a page
export async function deletePageData(userId: string, pageId: string) {
    if (!userId || !pageId) {
        throw new Error("Se requiere ID de usuario y de página para eliminar.");
    }

    try {
        const pageRef = doc(db, `users/${userId}/pages`, pageId);
        await deleteDoc(pageRef);
        return { success: true, message: 'Página eliminada correctamente.' };
    } catch (error) {
        console.error("Error al eliminar la página: ", error);
        if (error instanceof Error) {
            throw new Error(`No se pudo eliminar la página: ${error.message}`);
        }
        throw new Error("Ocurrió un error desconocido al eliminar la página.");
    }
}
