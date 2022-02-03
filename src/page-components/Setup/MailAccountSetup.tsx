import { MailAccountForm } from '@/components/mail-accounts/MailAccountForm'
import { useCreateFirstPrimaryMailAccountMutation } from '@/graphql/generated'
import {
  mailAccountSchema,
  MailAccountSchema,
} from '@/schemas/mailAccountSchema'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Divider,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

/**
 * MailAccountSetup props.
 */
export type MailAccountSetupProps = {
  firstPrimaryMailAccount?: boolean
  onSetup?: () => void
}

/**
 * MailAccountSetup component.
 */
export const MailAccountSetup: React.VFC<MailAccountSetupProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [createMailAccount, { loading: mailAccountLoading, error }] =
    useCreateFirstPrimaryMailAccountMutation()

  useEffect(() => {
    setLoading(mailAccountLoading)
  }, [mailAccountLoading, loading])

  const onMailAccountSubmit: SubmitHandler<MailAccountSchema> = async (
    data
  ) => {
    try {
      await createMailAccount({
        variables: { data },
      })

      if (props.onSetup) {
        props.onSetup()
      }
    } catch {}
  }

  return (
    <>
      <Container maxWidth="sm">
        <Box py={4}>
          <Typography variant="h3">セットアップ</Typography>
          <Typography color="text.secondary">
            まだセットアップが終わっていません。
          </Typography>
          {props.firstPrimaryMailAccount && (
            <Box py={4}>
              <MailAccountForm
                defaults={{ isPrimary: true }}
                onSubmit={onMailAccountSubmit}
                loading={loading}
                errorMessage={error?.message}
              />
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}
