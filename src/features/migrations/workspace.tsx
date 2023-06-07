import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";

export  function Workspace() {
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col p-5">
        <table className="w-full">
        <tbody className="flex flex-col  rounded-lg overflow-hidden ">
            <tr className="bg-white even:bg-black-200 odd:bg-black-400 flex even:bg-opacity-25 odd:bg-opacity-25">
                <td className="pl-2 py-1 flex text-primary">
                    <CodeBracketSquareIcon width={20}></CodeBracketSquareIcon>
                </td>
                <td className="px-2 py-1">Teste basico</td>
                <td className="px-2 py-1">Teste basico</td>
            </tr>
            <tr className="bg-white even:bg-black-200 odd:bg-black-400 flex even:bg-opacity-25 odd:bg-opacity-25">
                <td className="pl-2 py-1 flex text-primary">
                    <CodeBracketSquareIcon width={20}></CodeBracketSquareIcon>
                </td>
                <td className="px-2 py-1">Teste basico</td>
                <td className="px-2 py-1">Teste basico</td>
            </tr>
            <tr className="bg-white even:bg-black-200 odd:bg-black-400 flex even:bg-opacity-25 odd:bg-opacity-25">
                <td className="pl-2 py-1 flex text-primary">
                    <CodeBracketSquareIcon width={20}></CodeBracketSquareIcon>
                </td>
                <td className="px-2 py-1">Teste basico</td>
                <td className="px-2 py-1">Teste basico</td>
            </tr>
        </tbody>
        </table>
    </div>
  )
}
