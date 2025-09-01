import Link from 'next/link'
import type { FC } from 'react'
import React, { Fragment, useCallback } from 'react'

import Package from '~/../package.json'
import { useAppStore } from '~/atoms/app'
import { withNoSSR } from '~/components/app/HoC/no-ssr'
import { ImpressionView } from '~/components/common/ImpressionView'
import { TrackerAction } from '~/constants/tracker'
import { useAnalyze } from '~/hooks/app/use-analyze'
import { useInitialData, useThemeConfig } from '~/hooks/app/use-initial-data'
import { useFooterBackground } from '~/hooks/app/use-kami-theme'

import { FooterActions } from './actions'
import styles from './index.module.css'

const version = Package.version

const FooterContainer = (props) => {
  useFooterBackground(styles['footer'])

  return (
    <footer className={styles['footer']} id="app-footer">
      {props.children}
    </footer>
  )
}

export const FooterContent: FC = () => {
  const thisYear = new Date().getFullYear()
  const initialData = useInitialData()
  const name = initialData.user.name
  const kamiConfig = useThemeConfig()
  const motto = kamiConfig.site.footer.motto

  const icp = kamiConfig.site.footer.icp
  const navigation = kamiConfig.site.footer.navigation

  const { event } = useAnalyze()
  const trackerToGithub = useCallback(() => {
    event({
      action: TrackerAction.Click,
      label: '底部点击去 Github',
    })
  }, [])

  return (
    <div className={styles.wrap}>
      <div className="left to-center">
        <p>
          © {thisYear !== 2020 && '2020-'}
          {thisYear}{' '}
          <a href={kamiConfig.site.footer.homePage ?? '#'} target="_blank">
            {name}
          </a>
          .{' '}
          <span title={`${motto.content} -- ${motto.author}`}>
            {motto.content}
          </span>
        </p>
        <ImpressionView trackerMessage="底部曝光">
          <p className="children:flex-shrink-0 flex flex-wrap justify-center space-x-2">
            <span>Powered by </span>
            <a href="https://github.com/mx-space" onClick={trackerToGithub}>
              mx-space
            </a>
            .
            <a
              href="https://github.com/mx-space/kami"
              onClick={trackerToGithub}
              title={version}
            >
              Kami
            </a>
            .
            {icp.enable && !!icp.label && !!icp.link && (
              <div className="inline-block text-center">
                <a href={icp.link} target="_blank" rel="noreferrer">
                  {icp.label}
                </a>
              </div>
            )}
          </p>
        </ImpressionView>
      </div>
      <div className="center">
        <div className='flex'>
          <svg t="1756739592650" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1515" width="16" height="16"><path d="M846.116571 245.101714c-172.8-4.717714-284.525714-86.125714-317.696-113.737143a16.018286 16.018286 0 0 0-20.589714 0c-33.097143 27.721143-144.896 109.019429-317.696 113.737143a15.981714 15.981714 0 0 0-15.798857 15.798857v324.388572c0 145.188571 217.892571 316.306286 343.771429 316.306286 122.404571 0 343.808-171.117714 343.808-316.306286v-324.388572a16.091429 16.091429 0 0 0-15.798858-15.798857z m-472.100571 138.093715l81.298286-11.812572a16.201143 16.201143 0 0 0 12.105143-8.777143l36.388571-73.728a16.091429 16.091429 0 0 1 28.818286 0l36.388571 73.728a16.274286 16.274286 0 0 0 12.105143 8.777143l81.298286 11.812572a16.091429 16.091429 0 0 1 8.886857 27.428571l-58.770286 57.270857a15.981714 15.981714 0 0 0-4.608 14.189714l13.897143 81.005715a16.018286 16.018286 0 0 1-23.296 16.896l-72.704-38.180572a15.725714 15.725714 0 0 0-14.921143 0l-72.886857 38.180572a16.054857 16.054857 0 0 1-23.296-16.896l13.897143-81.005715a15.981714 15.981714 0 0 0-4.608-14.189714l-58.770286-57.307428a16.054857 16.054857 0 0 1 8.777143-27.428572z m304.274286 337.188571c0 8.704-6.948571 15.725714-15.652572 15.725714h-289.024a15.652571 15.652571 0 0 1-15.725714-15.725714V681.325714c0-8.704 7.021714-15.725714 15.725714-15.725714h289.024c8.667429 0 15.689143 7.021714 15.689143 15.725714v39.131429z" fill="#1afa29" p-id="1516"></path></svg>
          <p>
            <a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2025144036号</a>
          </p>
        </div>
      </div>
      <div className="right to-center">
        <p className="phone:mr-0 mr-12">
          {navigation.map((nav, i) => {
            return (
              <Fragment key={nav.name}>
                <Link
                  href={nav.path}
                  target={nav.newtab ? '_blank' : undefined}
                >
                  {nav.name}
                </Link>
                {i === navigation.length - 1 ? '' : ' · '}
              </Fragment>
            )
          })}
        </p>

        <p className="phone:mr-0 mr-12">
          <GatewayCount /> 个小伙伴正在浏览
        </p>
      </div>
    </div>
  )
}

const GatewayCount = () => {
  const gatewayCount = useAppStore((state) => state.gatewayOnline)
  return <>{gatewayCount || 1}</>
}
export const Footer = withNoSSR(() => {
  return (
    <FooterContainer>
      <FooterContent />
      <FooterActions />
    </FooterContainer>
  )
})
