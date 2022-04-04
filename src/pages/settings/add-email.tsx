import { NextPage } from 'next'
import { UserLayout } from '@/layouts/UserLayout/UserLayout'
import { AdminHeader } from '@/page-components/AdminHeader'
import { EmailForm } from '@/components/emails/EmailForm'
import { useState } from 'react'
import {
  useCreateTempEmailMutation,
  useValidateEmailAuthCodeMutation,
} from '@/graphql/generated'
import { useCurrentUser } from '@/atoms/auth'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

/**
 * AddEmail page.
 */
export const AddEmailPage: NextPage = () => {
  // mutations
  const [createEmail] = useCreateTempEmailMutation()
  const [validateEmail] = useValidateEmailAuthCodeMutation()

  // states
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // logic states
  const [{ currentUser }] = useCurrentUser()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [codeId, setCodeId] = useState<string>()

  const enterEmail = async (email: string) => {
    if (!currentUser) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data } = await createEmail({
        variables: {
          data: {
            userId: currentUser.id,
            address: email,
          },
        },
      })

      if (data?.createTempEmail.codeId) {
        setCodeId(data.createTempEmail.codeId)
        setPage(1)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }

    setLoading(false)
  }

  const enterCode = async (code: string) => {
    if (!codeId) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data } = await validateEmail({
        variables: {
          data: {
            codeId,
            code,
          },
        },
      })

      if (data?.validateEmailAuthCode) {
        enqueueSnackbar('メールアドレスを登録しました', { variant: 'success' })
        await router.push('/settings')
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }

    setLoading(false)
  }

  return (
    <UserLayout>
      <AdminHeader
        title="メールアドレスの追加"
        previousText="受け取り設定へ"
        previousHref="/settings"
      />
      <EmailForm
        page={page}
        loading={loading}
        undoTo={(page) => setPage(page)}
        errorMessage={error}
        enterEmail={enterEmail}
        enterCode={enterCode}
      />
    </UserLayout>
  )
}

export default AddEmailPage
