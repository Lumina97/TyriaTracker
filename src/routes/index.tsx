import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: baseComponent,
});

function baseComponent() {
  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    navigate({ to: "/tasks" });
  }, []);

  return <></>;
}
