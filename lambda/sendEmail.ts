import { fold } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/pipeable"
import * as D from "io-ts/lib/Decoder"
import * as nodemailer from "nodemailer"
import * as nodemailerSendgrid from "nodemailer-sendgrid"

const Payload = D.type({
  name: D.string,
  email: D.string,
  company: D.string,
  message: D.string,
})

export const handler = async function (event) {
  return pipe(
    Payload.decode(JSON.parse(event.body)),
    fold(
      (e) =>
        Promise.resolve({
          statusCode: 500,
          body: {
            event,
            msg: JSON.stringify({
              msg: D.draw(e),
            }),
          },
        }),
      (data) => {
        let transporter = nodemailer.createTransport(
          nodemailerSendgrid({
            apiKey: process.env.SENGRID_KEY, // this must be set in netlify backoffice -> site settings -> build & deploy -> environment
          })
        )

        return transporter
          .sendMail({
            from: "dev@squashideas.com",
            to: "dev@squashideas.com, f.sordillo@squashideas.com",
            subject: "new message from contact form!",
            html: `<div>
              <h2>New contact from website!</h2>
              <div>
                <strong>${data.name}</strong>${
              data.company ? ` from <strong>${data.company}</strong>` : ""
            } said this: <br><br>
                <div style="font-style: italic;">"${data.message}"</div>
                <br><br>
                <div>you can contat him back at ${data.email}</div>.
              </div>
            <div>`,
          })
          .catch((e) => {
            console.log(
              "error sending the message: ",
              e?.response?.body?.errors
            )

            return {
              statusCode: 500,
              event: null,
              body: JSON.stringify({
                msg: "error sending the message: " + e?.response?.body?.errors,
              }),
            }
          })
          .then((r) => {
            console.log("message sent: ", r)

            return {
              statusCode: 200,
              event: null,
              body: JSON.stringify({
                msg: "email sent.",
              }),
            }
          })
      }
    )
  )
}
