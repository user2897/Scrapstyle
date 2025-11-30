import Image from "next/image";
import UrlForm from "./components/UrlForm";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-semibold text-[var(--color-dark)] mb-4 leading-[1.1] tracking-[-0.02em]">
          <span
            className="block opacity-0"
            style={{
              animation: "slideUp 0.6s ease forwards",
              animationDelay: "0.1s",
            }}
          >
            Paste a URL.
          </span>
          <span
            className="block opacity-0"
            style={{
              animation: "slideUp 0.6s ease forwards",
              animationDelay: "0.3s",
            }}
          >
            <span className="text-[var(--color-primary)]">
              Get a design system.
            </span>
          </span>
        </h1>

        <p
          className="text-lg text-[var(--color-gray-600)] mb-10 max-w-md mx-auto opacity-0"
          style={{
            animation: "slideUp 0.6s ease forwards",
            animationDelay: "0.5s",
          }}
        >
          Generate AI-ready style guides for Cursor & Lovable in seconds.
        </p>

        <Image
          src="/spiral-hand-drawn-arrow-curly-line-doodle-black-arrow-funny-design-infographic-element-spiral-spring-pointer-illustration-vector-removebg-preview.svg"
          alt=""
          width={144}
          height={144}
          className="absolute left-[calc(50%+200px)] top-[calc(50%-20px)] -translate-y-1/2 w-36 h-auto hidden xl:block rotate-[120deg]"
          style={{
            animation: "fadeInSubtle 0.8s ease forwards",
            animationDelay: "1.2s",
            opacity: 0,
          }}
          aria-hidden="true"
          priority={false}
        />

        <UrlForm />

        <p
          className="mt-6 text-sm text-[var(--color-gray-500)] opacity-0"
          style={{
            animation: "slideUp 0.5s ease forwards",
            animationDelay: "0.9s",
          }}
        >
          Free to use · No designer needed
        </p>
      </div>
    </main>
  );
}
