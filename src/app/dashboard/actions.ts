
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp, collection, addDoc, getDocs, query, orderBy, deleteDoc, Timestamp, getDoc, updateDoc } from 'firebase/firestore';
import type { BuilderState } from '@/types';
import { format } from 'date-fns';

interface PageData {
    userId: string;
    pageId?: string;
    pageName: string;
    siteContent: string; 
}

interface GeneratedPageData {
    userId: string;
    siteContent: string; // This is expected to be a JSON string of BuilderState
}


interface FirestorePageData {
    name: string;
    content: string; // Content is a JSON string
    updatedAt: string;
    createdAt: string;
}

/**
 * Server Action: savePageData
 * 
 * Guarda o actualiza una página específica para un usuario en la subcolección 'paginas'.
 * El contenido de la página se guarda como una cadena JSON.
 * 
 * @param data - Un objeto que contiene el ID del usuario, el contenido del sitio (como string JSON), 
 *               el nombre de la página y opcionalmente el ID de la página a actualizar.
 * @returns Un objeto con el ID de la página guardada y un mensaje de éxito.
 */
export async function savePageData(data: PageData) {
    const { userId, pageId, pageName, siteContent } = data;

    if (!userId || !pageName || !siteContent) {
        throw new Error('Faltan datos requeridos para guardar la página.');
    }
    
    // El contenido del sitio ya es una cadena JSON desde el cliente.
    // No se necesita `JSON.stringify` aquí.
    const dataToSave = {
        name: pageName,
        content: siteContent, 
        updatedAt: serverTimestamp(),
    };

    try {
        if (pageId) {
            // Actualizar un documento existente
            const docRef = doc(db, 'sitios', userId, 'paginas', pageId);
            await updateDoc(docRef, dataToSave);
            return { success: true, message: '¡Página actualizada correctamente!', pageId: pageId };
        } else {
            // Crear un nuevo documento
            const docRef = await addDoc(collection(db, 'sitios', userId, 'paginas'), {
                ...dataToSave,
                createdAt: serverTimestamp(),
            });
            return { success: true, message: '¡Página guardada correctamente!', pageId: docRef.id };
        }

    } catch (error) {
        console.error('Error al guardar la página en Firestore:', error);
        if (error instanceof Error) {
            throw new Error(`Error de base de datos: ${error.message}`);
        }
        throw new Error('No se pudo guardar la página debido a un error inesperado.');
    }
}


/**
 * Server Action: saveGeneratedPage
 * 
 * Guarda una página generada por IA directamente, con un nombre automático.
 * 
 * @param data - Un objeto que contiene el ID del usuario y el contenido del sitio como string JSON.
 * @returns Un objeto con el ID y nombre de la página guardada.
 */
export async function saveGeneratedPage(data: GeneratedPageData) {
    const { userId, siteContent } = data;

    if (!userId || !siteContent) {
        throw new Error('Faltan datos requeridos para guardar la página generada.');
    }
    
    try {
        const pageName = `Página IA - ${format(Date.now(), 'dd/MM/yyyy HH:mm')}`;

        // FIX: siteContent ya es una cadena JSON, se guarda directamente.
        // No se necesita `JSON.stringify` aquí.
        const dataToSave = {
            name: pageName,
            content: siteContent, 
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        const userPagesColRef = collection(db, 'sitios', userId, 'paginas');
        const docRef = await addDoc(userPagesColRef, dataToSave);

        return { success: true, pageId: docRef.id, pageName: pageName };

    } catch (error) {
        console.error('Error al guardar la página generada en Firestore:', error);
        if (error instanceof Error) {
            throw new Error(`Error de base de datos: ${error.message}`);
        }
        throw new Error('No se pudo guardar la página generada debido a un error inesperado.');
    }
}



/**
 * Server Action: getUserPages
 * 
 * Obtiene la lista de todas las páginas guardadas por un usuario.
 * El contenido se devuelve como una cadena JSON.
 * 
 * @param userId - El ID del usuario.
 * @returns Una lista de las páginas del usuario, o null si no se encuentra.
 */
export async function getUserPages(userId: string): Promise<{ id: string; name: string; content: string; updatedAt: string; createdAt: string; }[] | null> {
    if (!userId) {
        return null;
    }

    try {
        const pagesQuery = query(collection(db, 'sitios', userId, 'paginas'), orderBy('updatedAt', 'desc'));
        const querySnapshot = await getDocs(pagesQuery);

        if (querySnapshot.empty) {
            return [];
        }

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            const updatedAt = data.updatedAt as Timestamp;
            const createdAt = data.createdAt as Timestamp;
            
            return {
                id: doc.id,
                name: data.name,
                content: data.content, // Devolver como string
                updatedAt: updatedAt ? updatedAt.toDate().toISOString() : new Date().toISOString(),
                createdAt: createdAt ? createdAt.toDate().toISOString() : new Date().toISOString(),
            };
        });
    } catch (error) {
        console.error('Error al obtener las páginas del usuario desde Firestore:', error);
        // Devuelve null para indicar un error en la obtención de datos
        return null;
    }
}

/**
 * Server Action: deletePageData
 * 
 * Elimina una página específica de un usuario de Firestore.
 * 
 * @param userId - El ID del usuario.
 * @param pageId - El ID de la página a eliminar.
 * @returns Un objeto indicando el éxito de la operación.
 */
export async function deletePageData(userId: string, pageId: string) {
     if (!userId || !pageId) {
        throw new Error('Faltan el ID de usuario o el ID de la página.');
    }
    try {
        const pageDocRef = doc(db, 'sitios', userId, 'paginas', pageId);
        await deleteDoc(pageDocRef);
        return { success: true, message: 'Página eliminada correctamente.' };
    } catch (error) {
        console.error('Error al eliminar la página de Firestore:', error);
         if (error instanceof Error) {
            throw new Error(`Error de base de datos al eliminar la página: ${error.message}`);
        }
        throw new Error('No se pudo eliminar la página debido a un error inesperado.');
    }
}


/**
 * Server Action: getPageData
 * 
 * Obtiene los datos de una página específica para la vista previa.
 * El contenido se devuelve como una cadena JSON.
 * 
 * @param userId - El ID del usuario.
 * @param pageId - El ID de la página.
 * @returns Los datos de la página, o null si no se encuentra.
 */
export async function getPageData(userId: string, pageId: string): Promise<FirestorePageData | null> {
    if (!userId || !pageId) {
        return null;
    }
    try {
        const pageDocRef = doc(db, 'sitios', userId, 'paginas', pageId);
        const docSnap = await getDoc(pageDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const updatedAt = data.updatedAt as Timestamp;
            const createdAt = data.createdAt as Timestamp;

            return {
                name: data.name,
                content: data.content, // Devolver como string
                updatedAt: updatedAt ? updatedAt.toDate().toISOString() : new Date().toISOString(),
                createdAt: createdAt ? createdAt.toDate().toISOString() : new Date().toISOString(),
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching page data for preview:", error);
        return null;
    }
}
