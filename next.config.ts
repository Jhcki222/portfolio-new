import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...["about", "experience", "projects", "skills", "contact"].flatMap(
        (section) => [
          { source: `/${section}`, destination: `/#${section}`, permanent: true },
          { source: `/${section}.html`, destination: `/#${section}`, permanent: true },
        ],
      ),
    ];
  },
};

export default nextConfig;
