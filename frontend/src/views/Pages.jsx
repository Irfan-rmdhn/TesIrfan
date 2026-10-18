import { useEffect, useState } from "react";
import Navbar from "../assets/navbar";
import { useFetch } from "../hooks/useFetch";
import { useActionData, useNavigate } from "react-router-dom";

export default function Pages() {
  const { get, destroy, post, update } = useFetch();
  const nav = useNavigate()
  const [NewPage, setNew] = useState(false);
  const [EditPagess, setEdit] = useState(false);
  const [modalApus, setModal] = useState(true);
  const [slugg, setSlugg] = useState("");
  const [pages, setpage] = useState([]);
  const [slugs, setslug] = useState("");
  const createSlug = (text) => {
    return text.toLowerCase().trim().replace(/\s+/g, "-");
  };
  const hapus = async () => {
    const res = await destroy(`/pages/${slugg}`);
    fetch();
  };
  const [error, setError] = useState();
  const slog = createSlug(slugs);
  console.log(slog);

  const fetch = async () => {
    const pagess = await get("/pages");
    setpage(pagess?.data);
  };
  const CreatePage = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    const res = await post("/pages", data);
    if (res.status) {
      setNew(false);
    } else {
      console.log(res.message);
    }
    console.log(res);
    fetch();
    e.target.reset();
    slog = "";
  };
  const EditPage = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await update(`/pages/${slugg}`, data);
    setError();
    console.log(res);
    if (res.status) {
      fetch();
      setEdit(false);
    } else {
      setError(res.message);
    }
    fetch();
    e.target.reset();
  };
  useEffect(() => {
    fetch();
  }, []);
  window.addEventListener("keydown", (e) => {
    // console.log(e);
    if (e.altKey && e.code == "KeyN") {
      e.preventDefault();
      setNew(true);
    }
    if (e.code == "Escape") {
      setNew(false);
      setEdit(false);
      setModal(true);
    }
  });
  return (
    <>
      <Navbar />

      <main class="app-main">
        <div class="page-container">
          <div class="page-header">
            <div class="page-header__left">
              <h1 class="page-title">My Pages</h1>
              <p class="page-subtitle">
                {" "}
                {pages?.length} pages · manage your web content
              </p>
            </div>
            <div>
              <button
                onClick={() => setNew(true)}
                class="btn btn--primary"
                type="button"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 1v11M1 6.5h11"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="square"
                  />
                </svg>
                New Page
                <span class="kbd">Alt+N</span>
              </button>
            </div>
          </div>

          <div class="pages-grid">
            {pages?.map((item) => (
              <div class="page-item">
                <div class="page-item__info">
                  <span class="page-item__title">
                    <a href="builder.html">{item?.title}</a>
                    <span class="page-item__title-arrow">→</span>
                  </span>
                  <div class="page-item__meta">
                    <span class="page-item__slug">/{item?.slug}</span>
                    <span class="page-item__summary">{item?.summary}</span>
                  </div>
                </div>
                <div class="page-item__actions">
                  <a  href={`/pages/${item?.slug}/builder`} class="btn btn--ghost btn--sm">
                    Build
                  </a>
                  <button
                    onClick={() => {
                      setSlugg(item?.slug);
                      setEdit(true);
                    }}
                    class="btn btn--ghost btn--sm"
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSlugg(item?.slug);
                      setModal(false);
                    }}
                    class="btn btn--danger btn--sm"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <form
        onSubmit={EditPage}
        class={`modal-backdrop ${!EditPagess ? "hidden" : ""}`}
      >
        <div
          class="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-create-title"
        >
          <div class="modal__header">
            <h2 class="modal__title" id="modal-create-title">
              Edit Page
            </h2>
            <button
              class="modal__close"
              onClick={() => setEdit(false)}
              type="button"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div class="modal__body">
            <div class="form-group">
              <label class="form-label" for="new-title">
                Title
              </label>
              <input
                onChange={(e) => setslug(e.target.value)}
                class="form-input"
                type="text"
                id="new-title"
                name="title"
                placeholder="e.g. Homepage"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="new-slug">
                Slug
              </label>
              <input
                class="form-input"
                type="text"
                id="new-slug"
                name="slug"
                value={slog}
                placeholder="e.g. homepage"
              />
              <span class="form-hint">
                Auto-generated from title. Lowercase, no spaces.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="new-summary">
                Summary <span class="form-hint">(optional)</span>
              </label>
              <textarea
                class="form-input"
                id="new-summary"
                name="summary"
                placeholder="Brief description of this page…"
              ></textarea>
            </div>
          </div>

          <div class="modal__footer">
            <button
              class="btn btn--ghost"
              onClick={() => setEdit(false)}
              type="button"
            >
              Cancel
            </button>
            <button class="btn btn--primary" type="submit">
              Save Page
            </button>
          </div>
        </div>
      </form>
      <form
        onSubmit={CreatePage}
        class={`modal-backdrop ${!NewPage ? "hidden" : ""}`}
      >
        <div
          class="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-create-title"
        >
          <div class="modal__header">
            <h2 class="modal__title" id="modal-create-title">
              New Page
            </h2>
            <button
              class="modal__close"
              onClick={() => setNew(false)}
              type="button"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div class="modal__body">
            <div class="form-group">
              <label class="form-label" for="new-title">
                Title
              </label>
              <input
                onChange={(e) => setslug(e.target.value)}
                class="form-input"
                type="text"
                id="new-title"
                name="title"
                placeholder="e.g. Homepage"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="new-slug">
                Slug
              </label>
              <input
                class="form-input"
                type="text"
                id="new-slug"
                name="slug"
                value={slog}
                placeholder="e.g. homepage"
              />
              <span class="form-hint">
                Auto-generated from title. Lowercase, no spaces.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="new-summary">
                Summary <span class="form-hint">(optional)</span>
              </label>
              <textarea
                class="form-input"
                id="new-summary"
                name="summary"
                placeholder="Brief description of this page…"
              ></textarea>
            </div>
          </div>

          <div class="modal__footer">
            <button
              class="btn btn--ghost"
              onClick={() => setNew(false)}
              type="button"
            >
              Cancel
            </button>
            <button class="btn btn--primary" type="submit">
              Save Page
            </button>
          </div>
        </div>
      </form>
      <div class={`modal-backdrop ${modalApus ? "hidden" : ""}`}>
        <div
          class="modal confirm-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-delete-title"
        >
          <div class="modal__header">
            <h2 class="modal__title" id="modal-delete-title">
              Delete Page
            </h2>
            <button
              onClick={() => setModal(true)}
              class="modal__close"
              type="button"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div class="modal__body">
            <div class="confirm-dialog__icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4v7"
                  stroke="#c0392b"
                  stroke-width="2"
                  stroke-linecap="square"
                />
                <circle cx="11" cy="16" r="1" fill="#c0392b" />
                <path
                  d="M3 19L11 3l8 16H3z"
                  stroke="#c0392b"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p class="confirm-dialog__text">
              Are you sure you want to delete <strong>"{slugg}"</strong>?<br />
              This action cannot be undone.
            </p>
          </div>

          <div class="modal__footer">
            <button
              onClick={() => setModal(true)}
              class="btn btn--ghost"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                hapus();
                setModal(true);
              }}
              class="btn btn--danger"
              type="button"
            >
              Ok, Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
