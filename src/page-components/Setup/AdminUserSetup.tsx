import { useJWT } from '@/atoms/auth'
import {
  AdminUserSetupForm,
  AdminUserSetupFormProps,
} from '@/components/users/AdminUserSetupForm'
import {
  useCheckTempUserAliveMutation,
  useCreateTempEmailMutation,
  useCreateTempUserMutation,
  useValidateEmailAuthCodeMutation,
} from '@/graphql/generated'
import { useWait } from '@/hooks/useWait'
import { SetupLayout } from '@/layouts/SetupLayout'
import { useCallback, useEffect, useState } from 'react'

const SETUP_TEMP_ADMIN_USER_ID_STORAGE_KEY = 'setup-temp-admin-user-id'

/**
 * AdminUserSetup props.
 */
export type AdminUserSetupProps = {
  onSetup(): void
}

/**
 * AdminUserSetup component.
 */
export const AdminUserSetup: React.VFC<AdminUserSetupProps> = (props) => {
  const [tempUserId, setTempUserId] = useState<string>()
  const [checkingAlive, setCheckingAlive] = useState(false)
  const [, setJWT] = useJWT()
  const [wait, waiting] = useWait()
  const [error, setError] = useState<string | null>()
  const [codeId, setCodeId] = useState<string>()

  const [wasSentOtc, setWasSentOtc] = useState(false)
  const [emailConfirmed, setEmailConfirmed] = useState(false)

  const [tempEmailLoading, setTempEmailLoading] = useState(false)

  const [createTempUserMutation, { loading: tempUserLoading }] =
    useCreateTempUserMutation()
  const [createTempEmail] = useCreateTempEmailMutation()
  const [checkTempUserAlive] = useCheckTempUserAliveMutation()

  const [validateEmailAuthCodeLoading, setValidateEmailAuthCodeLoading] =
    useState(false)
  const [validateEmailAuthCode] = useValidateEmailAuthCodeMutation()

  const checkAlive = useCallback(async () => {
    setError(null)
    await wait(1000)
    setCheckingAlive(true)
    const id = localStorage.getItem(SETUP_TEMP_ADMIN_USER_ID_STORAGE_KEY)

    if (id) {
      const { data } = await checkTempUserAlive({ variables: { id } })

      if (data?.checkTempUserAlive) {
        setTempUserId(id)
      } else {
        localStorage.removeItem(SETUP_TEMP_ADMIN_USER_ID_STORAGE_KEY)
        setEmailConfirmed(true)
      }
    }

    setCheckingAlive(false)
  }, [checkTempUserAlive, wait])

  const createEmail: AdminUserSetupFormProps['createTempEmail'] = async (
    data
  ) => {
    setError(null)
    await wait(1000)

    setTempEmailLoading(true)

    try {
      const email = await createTempEmail({ variables: { data } })
      setCodeId(email.data?.createTempEmail.codeId)
      setWasSentOtc(true)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
        setTempUserId(void 0)
      }
    }

    setTempEmailLoading(false)
  }

  useEffect(() => {
    checkAlive()
  }, [checkAlive])

  const createTempUser = async () => {
    setError(null)
    await wait(1000)
    const { data } = await createTempUserMutation()

    if (!data) {
      return
    }

    setTempUserId(data.createTempUser.id)
    localStorage.setItem('setup-temp-admin-user-id', data.createTempUser.id)
  }

  const backToEmail = () => {
    setWasSentOtc(false)
  }

  const checkCode = async (code: string) => {
    setError(null)

    if (!codeId) {
      setError('前回の操作から一定時間が経ったため、再度お試しください。')
      setTempUserId(void 0)
      return
    }

    await wait(1000)

    setValidateEmailAuthCodeLoading(true)

    try {
      const result = await validateEmailAuthCode({
        variables: {
          data: {
            codeId,
            code,
          },
        },
      })

      if (result.data?.validateEmailAuthCode) {
        setEmailConfirmed(true)
        setJWT(result.data.validateEmailAuthCode.jwt)
      } else {
        setError('認証コードが間違っています。再度お試しください。')
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }

    setValidateEmailAuthCodeLoading(false)
  }

  const handleComplete = () => {
    props.onSetup()
  }

  console.log({
    tempUserLoading,
    checkingAlive,
    tempEmailLoading,
    waiting,
    validateEmailAuthCodeLoading,
  })

  return (
    <SetupLayout>
      <AdminUserSetupForm
        loading={
          tempUserLoading ||
          checkingAlive ||
          tempEmailLoading ||
          waiting ||
          validateEmailAuthCodeLoading
        }
        error={error}
        tempUserId={tempUserId}
        wasSentOtc={wasSentOtc}
        createTempUser={createTempUser}
        createTempEmail={createEmail}
        backToEmail={backToEmail}
        checkCode={checkCode}
        emailConfirmed={emailConfirmed}
        onComplete={handleComplete}
      />
    </SetupLayout>
  )
}
