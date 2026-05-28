"use client";
import { useState } from "react";

const runCaveOnUrl = async (url: string) => {
  /* TODO:
   * 1. Parse url to get author and repo name
   * 2. Create temporary directory
   * 3. Run curl -L https://api.github.com/repos/<author>/<repo-name>/dotfiles/tarball/HEAD | tar -xz --strip-components=1 -C <temporary-directory>
   * 4. Start cave on the temporary directory some port
   * 5. Send cave HTTP requests
   * 6. Receieve data and use them
   */
};

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

export const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  const handleUrlSubmit = async (url: string) => {
    try {
      setState({ status: "loading" });
      await runCaveOnUrl(url);
      setState({ status: "success" });
    } catch (e) {
      setState({
        status: "error",
        message: e instanceof Error ? e.message : "Someting went wrong.",
      });
    }
  };

  return (
    // TODO: Proper Layout
    <div>
      <input
        className="btn"
        type="url"
        placeholder="https://github.com/user/repo"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="btn" onClick={() => handleUrlSubmit(url)}>
        Analyze Repo
      </button>
      {state.status == "error" && <p>{state.message}</p>}
    </div>
  );
};
