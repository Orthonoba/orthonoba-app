"use client";

import { useEffect, useMemo, useState } from "react";

type ImageKey =
  | "frontal"
  | "sonrisa"
  | "lateral_derecha"
  | "lateral_izquierda"
  | "oclusion_abierta"
  | "oclusion_cerrada";

type ImagesState = Record<ImageKey, File | null>;

const IMAGE_FIELDS: Array<{
  key: ImageKey;
  label: string;
  hint: string;
}> = [
  { key: "frontal", label: "Frontal", hint: "Rostro centrado y bien iluminado." },
  { key: "sonrisa", label: "Sonrisa", hint: "Sonrisa natural, encuadre estable." },
  { key: "lateral_derecha", label: "Lateral derecha", hint: "Perfil derecho a 90°." },
  { key: "lateral_izquierda", label: "Lateral izquierda", hint: "Perfil izquierdo a 90°." },
  { key: "oclusion_abierta", label: "Oclusión abierta", hint: "Arcadas separadas, foco en mordida." },
  { key: "oclusion_cerrada", label: "Oclusión cerrada", hint: "Mordida en máxima intercuspidación." },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes)) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let u = 0;
  while (value >= 1024 && u < units.length - 1) {
    value /= 1024;
    u++;
  }
  const rounded = u === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[u]}`;
}

export default function PacientesPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
  });

  const [imagenes, setImagenes] = useState<ImagesState>({
    frontal: null,
    sonrisa: null,
    lateral_derecha: null,
    lateral_izquierda: null,
    oclusion_abierta: null,
    oclusion_cerrada: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const [previews, setPreviews] = useState<Record<ImageKey, string | null>>({
    frontal: null,
    sonrisa: null,
    lateral_derecha: null,
    lateral_izquierda: null,
    oclusion_abierta: null,
    oclusion_cerrada: null,
  });

  useEffect(() => {
    const next: Record<ImageKey, string | null> = {
      frontal: null,
      sonrisa: null,
      lateral_derecha: null,
      lateral_izquierda: null,
      oclusion_abierta: null,
      oclusion_cerrada: null,
    };

    (Object.keys(imagenes) as ImageKey[]).forEach((k) => {
      const file = imagenes[k];
      next[k] = file ? URL.createObjectURL(file) : null;
    });

    setPreviews(next);

    return () => {
      (Object.values(next) as Array<string | null>).forEach((u) => {
        if (u) URL.revokeObjectURL(u);
      });
    };
  }, [imagenes]);

  const missing = useMemo(() => {
    const nombreOk = form.nombre.trim().length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    return {
      nombreOk,
      emailOk,
      isValid: nombreOk && emailOk,
    };
  }, [form.email, form.nombre]);

  const selectedCount = useMemo(
    () => Object.values(imagenes).filter(Boolean).length,
    [imagenes],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus({ type: "idle" });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0] ?? null;
    setImagenes((prev) => ({ ...prev, [name]: file } as ImagesState));
    setStatus({ type: "idle" });
  };

  const clearImage = (key: ImageKey) => {
    setImagenes((prev) => ({ ...prev, [key]: null }));
    setStatus({ type: "idle" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle" });

    if (!missing.isValid) {
      setStatus({
        type: "error",
        message: "Revisa los datos del paciente (nombre y email).",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const data = new FormData();
      data.append("nombre", form.nombre.trim());
      data.append("email", form.email.trim());

      (Object.entries(imagenes) as Array<[ImageKey, File | null]>).forEach(
        ([key, file]) => {
          if (file) data.append(key, file);
        },
      );

      const res = await fetch("/api/pacientes", {
        method: "POST",
        body: data,
      });

      let payload: any = null;
      try {
        payload = await res.json();
      } catch {
        payload = null;
      }

      if (!res.ok) {
        const msg =
          payload?.message ||
          payload?.error ||
          "No se pudo guardar el paciente. Intenta nuevamente.";
        throw new Error(msg);
      }

      setStatus({ type: "success", message: "Paciente guardado correctamente." });

      setForm({ nombre: "", email: "" });
      setImagenes({
        frontal: null,
        sonrisa: null,
        lateral_derecha: null,
        lateral_izquierda: null,
        oclusion_abierta: null,
        oclusion_cerrada: null,
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Ocurrió un error inesperado.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-0px)] bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Registro clínico
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Pacientes
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Crea un nuevo paciente y adjunta fotografías clínicas. Las imágenes
              se suben junto con los datos del paciente.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-xs font-medium text-slate-500">
                Imágenes seleccionadas
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {selectedCount} / {IMAGE_FIELDS.length}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-base font-semibold text-slate-900">
                  Datos del paciente
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Completa la información básica antes de adjuntar las fotos.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-6">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-slate-800">
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        value={form.nombre}
                        onChange={handleChange}
                        name="nombre"
                        type="text"
                        placeholder="Ej. María Pérez"
                        className={cn(
                          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition",
                          "placeholder:text-slate-400",
                          missing.nombreOk
                            ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            : "border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10",
                        )}
                        aria-invalid={!missing.nombreOk}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Mínimo 2 caracteres.
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-800">
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        value={form.email}
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="correo@dominio.com"
                        className={cn(
                          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition",
                          "placeholder:text-slate-400",
                          missing.emailOk
                            ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            : "border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10",
                        )}
                        aria-invalid={!missing.emailOk}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Usaremos este email para identificar al paciente.
                    </p>
                  </div>

                  {status.type !== "idle" && (
                    <div
                      className={cn(
                        "rounded-xl border px-4 py-3 text-sm",
                        status.type === "success" &&
                          "border-emerald-200 bg-emerald-50 text-emerald-800",
                        status.type === "error" &&
                          "border-rose-200 bg-rose-50 text-rose-800",
                      )}
                      role="status"
                    >
                      {status.message}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || !missing.isValid}
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition sm:w-auto",
                        "focus:outline-none focus:ring-4 focus:ring-blue-500/20",
                        isSubmitting || !missing.isValid
                          ? "cursor-not-allowed bg-slate-200 text-slate-500"
                          : "bg-blue-600 text-white hover:bg-blue-700",
                      )}
                    >
                      {isSubmitting ? "Guardando..." : "Guardar paciente"}
                    </button>

                    <div className="text-xs text-slate-500">
                      Consejo: adjunta al menos las fotos clave para una mejor
                      evaluación.
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Recomendaciones rápidas
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  Usa buena iluminación y evita sombras duras.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  Mantén el encuadre centrado y el foco nítido.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  Idealmente JPG/PNG; evita archivos muy pesados.
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Fotografías clínicas
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Adjunta las imágenes. Verás una previsualización antes de
                      guardar.
                    </p>
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Tip: puedes subirlas en cualquier orden
                  </div>
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {IMAGE_FIELDS.map((field) => {
                    const file = imagenes[field.key];
                    const preview = previews[field.key];
                    return (
                      <div
                        key={field.key}
                        className={cn(
                          "group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition",
                          file ? "border-slate-200" : "border-slate-200",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3 p-4">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              {field.label}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              {field.hint}
                            </div>
                          </div>

                          {file ? (
                            <button
                              type="button"
                              onClick={() => clearImage(field.key)}
                              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                            >
                              Quitar
                            </button>
                          ) : (
                            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                              Opcional
                            </div>
                          )}
                        </div>

                        <div className="px-4 pb-4">
                          <div
                            className={cn(
                              "relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border",
                              preview
                                ? "border-slate-200 bg-slate-50"
                                : "border-dashed border-slate-200 bg-slate-50",
                            )}
                          >
                            {preview ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={preview}
                                alt={`Previsualización ${field.label}`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="px-6 text-center">
                                <div className="text-sm font-medium text-slate-700">
                                  Arrastra y suelta o selecciona un archivo
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                  JPG, PNG o WebP
                                </div>
                              </div>
                            )}

                            <label className="absolute inset-0 cursor-pointer">
                              <span className="sr-only">
                                Subir imagen {field.label}
                              </span>
                              <input
                                type="file"
                                name={field.key}
                                onChange={handleImage}
                                accept="image/*"
                                className="hidden"
                              />
                            </label>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-xs font-medium text-slate-700">
                                {file ? file.name : "Sin archivo"}
                              </div>
                              <div className="text-xs text-slate-500">
                                {file ? formatBytes(file.size) : "—"}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const input = document.querySelector(
                                    `input[type="file"][name="${field.key}"]`,
                                  ) as HTMLInputElement | null;
                                  input?.click();
                                }}
                                className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/15"
                              >
                                {file ? "Cambiar" : "Seleccionar"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Checklist rápido
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Verifica iluminación, encuadre y nitidez antes de guardar.
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {selectedCount} seleccionadas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
