
import { IApp} from "../../types";

interface ISidePanel{
    appStore:IApp
}
export  function SidePanel(args:ISidePanel) {
    console.log(args.appStore.workspace);

  return (
    <div className="flex flex-col h-full w-full">
      

    </div>
  )
}
