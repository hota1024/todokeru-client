import {
  MailQuery,
  ReadTransportMutation,
  TransportQuery,
} from '@/graphql/generated'

/**
 * MailView props.
 */
export type MailViewProps = {
  mail:
    | MailQuery['mail']
    | ReadTransportMutation['readTransport']['mail']
    | TransportQuery['transport']['mail']
  isPreview?: boolean
  orgName?: string
}

/**
 * MailView component.
 */
export const MailView: React.VFC<MailViewProps> = (props) => {
  const { mail, isPreview, orgName } = props

  let body = mail.body

  return (
    <>
      <div className="mail-container">
        <div className="mail-content">
          <h2 className="mail-from">{orgName}</h2>
          <h1 className="mail-title">{mail.subject}</h1>
          <div className="mail-body">
            {body.split(/\n/g).map((l, key) => (
              <p key={key}>
                {l.startsWith('https://') ? (
                  <a className="mail-body-link" href={l}>
                    {l}
                  </a>
                ) : (
                  l
                )}
              </p>
            ))}
          </div>
          <hr className="mail-divider" />
          <div className="mail-send-to">
            こちらのメールは下記を対象に送信されています。
            <ul>
              {mail.groups.map((g) => (
                <li key={g.name}>{g.name}</li>
              ))}
            </ul>
          </div>
          <hr className="mail-divider" />
          <div className="mail-send-by">
            <p>
              このメールはメール配信ソフト「Todokeru」により送信されました。
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mail-container {
          background: #f0f0f4;
          color: #303030;
          width: 100%;
          ${isPreview ? '' : 'min-height: 100vh;'}
        }
        .mail-content {
          text-align: left;
          max-width: 1000px;
          margin: auto;
          padding: 32px;
        }
        .mail-from {
          font-size: 0.8rem;
          color: #606060;
          font-weight: bold;
          margin: 0;
        }
        .mail-title {
          font-size: 2rem;
          margin: 0;
          margin-bottom: 16px;
        }
        .mail-body {
          font-size: 0.95rem;
          font-weight: bold;
        }
        .mail-body-link {
          color: #1562cc;
        }
        .mail-send-to {
          margin-top: 32px;
          color: #a0a0a0;
          font-weight: bold;
        }
        .mail-send-to ul {
          color: #606060;
        }
        .mail-divider {
          border: 1px solid #e0e0e0;
          margin: 32px 0;
        }
        .mail-send-by {
          font-size: 0.8rem;
          font-weight: bold;
          color: #a0a0a0;
        }
        .mail-report-address {
          color: #677588;
        }
      `}</style>
    </>
  )
}
