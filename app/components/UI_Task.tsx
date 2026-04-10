/** UI component used for VsCodeUI task items */
export default function UI_Task({ task }: { task: string }) {
  return (
    <div className="flex flex-col">
      <ul className="flex flex-col items-center">
        <li>
          <span className="ui-circle"></span>
        </li>
        <li>
          <span className="ui-circle"></span>
        </li>
        <li>
          <span className="ui-circle"></span>
        </li>
      </ul>
      <p className="mt-1! task">
        <span className="bg-secondary-color py-1 px-2 ml-5! rounded-full">
          {task}
        </span>
      </p>
    </div>
  );
}
