import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { post, } = useFetch();
  const { user, register } = useAuth();
  const [error, setError] = useState();
  useEffect(()=>{
    if(user) return nav('/pages')
  })
  const nav = useNavigate()
  const submit = async (e) => {
    setError()
    console.log("yres");
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await post("/register", data);
    if (res.status) {
      register(res.data.data);
      nav('/pages')
    } else {
      console.log(res.message);
      setError(res.message);
    }
    console.log(user);
    console.log(res);
    console.log(error);
  };
  console.log(user);

  return (
    <>
      <div class="auth-panel auth-panel--right">
        <div class="auth-card">
          <div class="auth-card__header">
            <h1 class="auth-card__title">Create Account</h1>
            <p class="auth-card__subtitle">Start building your pages today</p>
          </div>

          <form onSubmit={submit} class="auth-card__body">
            <div class="form-group">
              <label class="form-label" for="name">
                Full Name
              </label>
              <input
                class={`form-input form-input${error?.name ? "--error" : ""}`}
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                autocomplete="name"
              />
              {error?.name && (
                <span class="form-error">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6.5"
                      cy="6.5"
                      r="5.5"
                      stroke="#c0392b"
                      stroke-width="1.5"
                    />
                    <path
                      d="M6.5 4v3"
                      stroke="#c0392b"
                      stroke-width="1.5"
                      stroke-linecap="square"
                    />
                    <circle cx="6.5" cy="9" r="0.7" fill="#c0392b" />
                  </svg>
                  {error?.name}
                </span>
              )}
            </div>

            <div class="form-group">
              <label class="form-label" for="email">
                Email Address
              </label>
              <input
                class={`form-input form-input${error?.email ? "--error" : ""}`}
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
              {error?.email && (
                <span class="form-error">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6.5"
                      cy="6.5"
                      r="5.5"
                      stroke="#c0392b"
                      stroke-width="1.5"
                    />
                    <path
                      d="M6.5 4v3"
                      stroke="#c0392b"
                      stroke-width="1.5"
                      stroke-linecap="square"
                    />
                    <circle cx="6.5" cy="9" r="0.7" fill="#c0392b" />
                  </svg>
                  {error?.email}
                </span>
              )}
            </div>

            <div class="form-group">
              <label class="form-label" for="password">
                Password
              </label>
              <input
                class={`form-input form-input${error?.password ? "--error" : ""}`}
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                autocomplete="new-password"
              />
              {error?.password && (
                <span class="form-error">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6.5"
                      cy="6.5"
                      r="5.5"
                      stroke="#c0392b"
                      stroke-width="1.5"
                    />
                    <path
                      d="M6.5 4v3"
                      stroke="#c0392b"
                      stroke-width="1.5"
                      stroke-linecap="square"
                    />
                    <circle cx="6.5" cy="9" r="0.7" fill="#c0392b" />
                  </svg>
                  {error?.password}
                </span>
              )}
              <span class="form-hint">Minimum 8 characters</span>
            </div>

            <button class="btn btn--primary btn--full" type="submit">
              Create Account
            </button>
          </form>

          <div class="auth-card__footer">
            <span>Already have an account?</span>
            <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </>
  );
}
