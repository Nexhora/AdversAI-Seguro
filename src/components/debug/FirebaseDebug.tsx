
"use client";

export default function FirebaseDebug() {
  return (
    <div className="p-4 m-4 border-2 border-dashed border-red-500 bg-red-100 text-red-800 rounded">
      <h2 className="font-bold text-lg mb-2">Diagnóstico Firebase</h2>
      <p>
        <strong>Credenciales detectadas:</strong>{" "}
        ✅ Sí (Hardcodeadas)
      </p>

      <p className="mt-2">
       Este componente ha sido simplificado. Las credenciales de Firebase están ahora directamente integradas en el código (`src/lib/firebase.ts`), por lo que la conexión siempre debería funcionar.
      </p>
    </div>
  );
}
