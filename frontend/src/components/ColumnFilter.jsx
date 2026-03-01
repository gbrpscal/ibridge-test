import { useEffect, useMemo, useRef, useState } from "react";

export default function ColumnFilter({
  title = "Filtro",
  values = [],
  selected = new Set(),
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  const POP_W = 280;
  const POP_MARGIN = 8;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function computePos() {
    const btn = ref.current?.querySelector("button");
    if (!btn) return;

    const r = btn.getBoundingClientRect();

    let top = r.bottom + POP_MARGIN;
    let left = r.left;

    const maxTop = window.innerHeight - POP_MARGIN;

    const estimatedH = 380;
    if (top + estimatedH > maxTop) {
      top = Math.max(POP_MARGIN, r.top - POP_MARGIN - estimatedH);
    }

    left = clamp(left, POP_MARGIN, window.innerWidth - POP_W - POP_MARGIN);

    setPos({ top, left });
  }

  function toggleOpen() {
    setOpen((s) => {
      const next = !s;
      if (next) {
        setTimeout(computePos, 0);
      }
      return next;
    });
  }

  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onRecalc = () => computePos();
    window.addEventListener("scroll", onRecalc, true);
    window.addEventListener("resize", onRecalc);
    return () => {
      window.removeEventListener("scroll", onRecalc, true);
      window.removeEventListener("resize", onRecalc);
    };
  }, [open]);

  const filteredValues = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return values;
    return values.filter((v) => String(v).toLowerCase().includes(query));
  }, [values, q]);

  const allSelected = selected.size === 0 || selected.size === values.length;

  function toggleValue(v) {
    const next = new Set(selected);
    if (next.has(v)) next.delete(v);
    else next.add(v);

    if (next.size === values.length) next.clear();

    onChange(next);
  }

  function selectAll() {
    onChange(new Set());
  }

  return (
    <span className="colFilter" ref={ref}>
      <button
        type="button"
        className="colFilterBtn"
        onClick={toggleOpen}
        title={`Filtrar ${title}`}
      >
        ▾
      </button>

      {open && (
        <div
          className="colFilterPop"
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            width: POP_W,
            zIndex: 9999,
          }}
        >
          <div className="colFilterHeader">
            <strong>{title}</strong>
            <button className="colFilterClose" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <input
            className="colFilterSearch"
            placeholder="Buscar..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <div className="colFilterActions">
            <button type="button" onClick={selectAll}>
              Selecionar tudo
            </button>
            <button type="button" onClick={() => onChange(new Set())}>
              Limpar filtro
            </button>
          </div>

          <div className="colFilterList">
            {filteredValues.map((v) => {
              const isChecked = allSelected ? true : selected.has(v);
              return (
                <label key={String(v)} className="colFilterItem">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleValue(v)}
                  />
                  <span>{String(v)}</span>
                </label>
              );
            })}
          </div>

          <div className="colFilterFooter">
            {selected.size === 0 ? (
              <span>Sem filtro</span>
            ) : (
              <span>{selected.size} selecionado(s)</span>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
