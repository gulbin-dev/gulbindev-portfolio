import { LuFilter } from "react-icons/lu";

/** Discover page content */
export default function Discover() {
  return (
    <div id="smooth-content">
      <main className="bg-primary-color-darker">
        <section id="dicover-top">
          <h1 className="text-center text-heading-xl pt-5 px-3">
            Explore my work
          </h1>
          <p className="mt-1 text-pretty px-3">
            Client projects are projects from a real client while Demo projects
            are for my skill demonstration/showcase only
          </p>
          <ul className="flex mt-5 justify-center">
            <li>
              <button className="text-heading-lg py-2 px-3 rounded-l-lg bg-col-neutral-2">
                Client
              </button>
            </li>
            <li>
              <button className="text-heading-lg py-2 px-3 rounded-r  -lg bg-col-neutral-1">
                Demo
              </button>
            </li>
          </ul>
          {/* projects */}
          <div className="work-div bg-col-neutral-2 mt-4 px-0! py-1"></div>
        </section>
        <section>
          <h2>Any ideas you may have? Let&apos;s make it real.</h2>
          <p>Reach me here</p>
        </section>
      </main>
    </div>
  );
}
