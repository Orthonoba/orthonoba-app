export default function Page() {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Solicitar Demo</h1>
  
        <form style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
          <input placeholder="Nombre" />
          <input placeholder="Email" />
          <input placeholder="Teléfono" />
          <textarea placeholder="Mensaje" />
          <button type="submit">Enviar</button>
        </form>
      </main>
    );
  }