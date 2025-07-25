"use client";

import { firebaseCredentialsExist } from "@/lib/firebase";

export default function FirebaseDebug() {
  return (
    <div className="p-4 m-4 border-2 border-dashed border-red-500 bg-red-100 text-red-800 rounded">
      <h2 className="font-bold text-lg mb-2">Diagnóstico Firebase</h2>
      <p>
        <strong>Credenciales detectadas:</strong>{" "}
        {firebaseCredentialsExist ? "✅ Sí" : "❌ No"}
      </p>

      <p className="mt-2">
        Este mensaje se muestra en tiempo de ejecución. Si ves ❌, significa que
        el objeto <code>firebaseConfig</code> no está bien cargado.
      </p>
    </div>
  );
}
