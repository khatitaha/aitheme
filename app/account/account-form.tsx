'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Link from 'next/link'

// ...

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`name`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setName(data.name)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: name,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
        email: user?.email,
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-6">

      <div className="w-full max-w-md rounded-lg bg-neutral-800 p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold text-white">Profile Settings</h2>

        <div className="space-y-4">
          {/* Email (Read-only) */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-300">Email</label>
            <input
              id="email"
              type="text"
              value={user?.email}
              disabled
              className="rounded-md border border-neutral-700 bg-neutral-900 p-2 text-gray-400 focus:outline-none"
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-sm text-gray-300">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-neutral-700 bg-neutral-900 p-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-gray-300">Username</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md border border-neutral-700 bg-neutral-900 p-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col">
            <label htmlFor="website" className="text-sm text-gray-300">Website</label>
            <input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
              className="rounded-md border border-neutral-700 bg-neutral-900 p-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Update Button */}
          <button
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:bg-gray-600"
            // onClick={() => updateProfile({ name, username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>

          {/* Sign Out Button */}
          <form action="/auth/signout" method="post">
            <button
              className="mt-3 w-full rounded-md border border-red-600 px-4 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
              type="submit"
            >
              Sign Out
            </button>
            <Link href={'https://sandbox-customer-portal.paddle.com/login/cpl_01jpsh6k8w08ww5rewv6qa0tc8'} className=' font-bold'>customer portal {"=>"}</Link>
          </form>
        </div>
      </div>
    </div>
  )
}