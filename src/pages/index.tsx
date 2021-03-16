import React, { ReactElement } from "react"
import PageLayout from "../components/layouts/PageLayout"
import Section from "../components/layouts/SectionLayout"
import CookieBanner from "../components/CookieBanner"
import Header from "../components/Header"
import Column from "../components/Column"

function Index(): ReactElement {
  return (
    <>
      <Header />
      <PageLayout>
        <CookieBanner />

        <Section>
          <Column centered style={{ padding: "80px 0", minHeight: "120vh" }}>
            __template__website__name
          </Column>
        </Section>

        <Section id={"contacts"}>
          <Column
            centered
            style={{
              backgroundColor: "red",
              padding: "80px 0",
              minHeight: "120vh",
            }}
          >
            contacts
          </Column>
        </Section>

        <Column centered style={{ padding: "80px 0", minHeight: "220vh" }}>
          padding bottom
        </Column>
      </PageLayout>
    </>
  )
}

export default Index
