import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    layout("components/layout.tsx", [
        route("/home", "routes/home.tsx"),
    ])
] satisfies RouteConfig;
