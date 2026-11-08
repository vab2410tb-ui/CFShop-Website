import { prisma } from "@/lib/prisma"
import { deleteUser } from "@/actions/auth/delelte-user"
import { Trash2 } from "lucide-react"

const UsersPage = async () => {
    const user = await prisma.user.findMany()
    return(
        <div className="p-6">
            <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                <table className="w-full min-w-200px border-collapse text-left">
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className="w-[40%] p-4 font-semibold text-left">Full Name</th>
                            <th className="w-[15%] p-4 font-semibold text-left">Email</th>
                            <th className="w-[10%] p-4 font-semibold text-left">Role</th>
                            <th className="w-[10%] p-4 font-semibold text-left">Joined Date</th>
                            <th className="w-[10%] p-4 font-semibold text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.length === 0 ? (
                            <td colSpan={5} className="p-10 text-center text-slate-500">
                                No User found.
                            </td>
                        ): (
                            user.map((u) => (
                                <tr key={u.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
                                    <td className="flex items-center gap-4 p-4">
                                        {u.name}
                                    </td>

                                    <td className="p-4 text-left">
                                        {u.email}
                                    </td>

                                    <td className="p-4 text-left">
                                        {u.role}
                                    </td>

                                    <td className="p-4 text-left">
                                        {u.createdAt?.toLocaleDateString('vi-VN')}
                                    </td>

                                    <td className="p-4 text-left">
                                    <form
                                            action={async () => {
                                                "use server";
                                                await deleteUser(u.id);
                                            }}
                                            className="m-0 flex"
                                        >
                                            <button
                                            type="submit"
                                            className="flex cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                                            >
                                            <Trash2 className="h-5 w-5" />
                                            </button>
                                        </form>
                                    </td>

                                </tr>
                            ))
                        )}
                
                    </tbody>  
                </table>
            </div>
        </div>
    )
}

export default UsersPage