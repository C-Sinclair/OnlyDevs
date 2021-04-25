import { loginWithGithub } from "../../hooks/auth";

export function GithubLoginButton({ }) {
  return (
    <button onClick={loginWithGithub}>
      Login with Github
    </button>
  )
}