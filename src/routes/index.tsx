import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: baseComponent,
});

function baseComponent() {
  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    navigate({ to: "/SignIn" });
  }, []);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
