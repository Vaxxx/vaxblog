import { User, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

async function getUsers(): Promise<User[]> {
    const res = await fetch(
        'http://localhost:3000/api/register'
    )
    const data = await res.json()
    return data.users
}

export default async function Page() {
    const data = await getUsers()
console.log("data")
console.log(data)
    return (
        <section className='py-24'>
            <div className='container'>
                <h1 className='mb-6 text-3xl font-bold'>All Users</h1>
                <DataTable columns={columns} data={data} />
            </div>
        </section>
    )
}
