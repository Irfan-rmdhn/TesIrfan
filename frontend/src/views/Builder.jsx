import { useParams } from "react-router-dom";
import Navbar from "../assets/navbar";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

export default function Builder() {
  const { slug } = useParams();
  const { get, post } = useFetch();
  const [AddSection, setSection] = useState(true);
  const [pageSec, setPageSec] = useState();
  const [pages, setPages] = useState();
  const [Template, setTemplate] = useState([]);
  const fetch = async () => {
    const pagess = await get(`/pages/${slug}`);
    setPages(pagess?.data);
    setPageSec(pagess?.data?.sections);

    const temp = await get("/templates");
    console.log(temp?.data?.templates);
    setTemplate(temp?.data?.templates);
  };
  console.log(pageSec);

  const createSection = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.position = pageSec?.length + 1;
    console.log(data);

    const res = await post(`/pages/${slug}/sections`, data);
    console.log(res);
  };
  useEffect(() => {
    fetch();
  }, []);
  const [openSection,setOpen] = useState(false)

  window.addEventListener('keydown',(e)=>{
    if(e.altKey && e.code == 'KeyS'){
      e.preventDefault()
      setSection(false)
    }
    if(e.code == 'Escape'){
      setSection(true)
    }
  })
  return (
    <>
      <Navbar />
      <div class="app-main">
        <div class="builder-layout">
          <div class="builder-main">
            <div class="builder-toolbar">
              <div class="builder-toolbar__left">
                <div class="builder-breadcrumb">
                  <a href="/pages">Pages</a>
                  <span>→</span>
                  <span>{slug}</span>
                </div>
                <div class="builder-toolbar__divider"></div>
                <span class="tag">{pageSec?.length} sections</span>
              </div>
              <div class="navbar__actions">
                <a
                  onClick={() => setSection(false)}
                  class="btn btn--primary btn--sm"
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
                  Add Section
                </a>
                <a href={`/pages/${slug}/preview`} class="btn btn--ghost btn--sm">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 6.5C1 6.5 3 2 6.5 2S12 6.5 12 6.5 10 11 6.5 11 1 6.5 1 6.5z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="6.5"
                      cy="6.5"
                      r="1.75"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                  </svg>
                  Preview
                </a>
              </div>
            </div>

            <div class="builder-canvas">
              <div class="field-editor field-editor--open">
                {pageSec?.map((item) => (
                  <div className="field-editor" key={item.id}>
                    <div class="field-editor__header">
                      <div>
                        <div class="field-editor__title">
                          <span class="tag">0{item?.id}</span>
                          &nbsp; Hero Section
                        </div>
                        <div class="field-editor__meta">
                          template: {item?.template?.name}
                        </div>
                      </div>
                      <div class="field-editor__toggle">
                        <span>Collapse</span>
                        <svg
                          class="field-editor__chevron"
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1l5 5 5-5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="square"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="field-editor__body">
                      {item.fields?.map((field) => (
                        <div className="form-group" key={field.id}>
                          <label className="form-label">{field.name}</label>

                          <input
                            className="form-input"
                            type={field.type === "image" ? "url" : field.type}
                            placeholder={`Masukkan ${field.name}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div class="field-editor__footer">
                  <div class="shortcuts-hint">
                    <span class="kbd">Esc</span> to close
                  </div>
                  <div class="field-editor__footer-actions">
                    <button class="btn btn--ghost btn--sm" type="button">
                      Discard
                    </button>
                    <button class="btn btn--primary btn--sm" type="button">
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <div class="field-editor--open">
                <div class="field-editor__header">
                  <div>
                    <div class="field-editor__title">
                      <span class="tag">02</span>
                      &nbsp; Features Grid
                    </div>
                    <div class="field-editor__meta">
                      template: feature-grid · 4 fields
                    </div>
                  </div>
                  <div class="field-editor__toggle">
                    <span>Expand</span>
                    <svg
                      class="field-editor__chevron"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 7l5-5 5 5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="field-editor">
                <div class="field-editor__header">
                  <div>
                    <div class="field-editor__title">
                      <span class="tag">03</span>
                      &nbsp; Call to Action
                    </div>
                    <div class="field-editor__meta">
                      template: cta-strip · 2 fields
                    </div>
                  </div>
                  <div class="field-editor__toggle">
                    <span>Expand</span>
                    <svg
                      class="field-editor__chevron"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 7l5-5 5 5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ADD SECTION */}
              <form
                onSubmit={createSection}
                class={`add-section-panel ${AddSection ? "hidden" : ""}`}
              >
                <div class="add-section-panel__header">
                  <span class="add-section-panel__title">Add Section</span>
                  <button
                    class="btn btn--ghost btn--sm btn--icon"
                    type="button"
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1l9 9M10 1L1 10"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                    </svg>
                  </button>
                </div>
                <div class="form-wrap">
                  <div class="form-group" style={{ flex: 1 }}>
                    <label class="form-label" for="section-name">
                      Section Name
                    </label>
                    <input
                      type="text"
                      class="form-input"
                      id="section-name"
                      placeholder="Hero 1"
                      name="name"
                    />
                  </div>
                  <div class="form-group" style={{ flex: 1 }}>
                    <label class="form-label" for="section-template">
                      Section Template
                    </label>
                    <select
                      class="form-input"
                      id="section-template"
                      name="template_id"
                    >
                      <option value="" disabled selected>
                        Choose a template…
                      </option>
                      {Template?.map((item) => (
                        <option value={item?.id}>
                          {item?.slug} — {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    class="btn btn--primary"
                    type="submit"
                    style={{ alignSelf: "flex-start" }}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
