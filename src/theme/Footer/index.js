import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import FooterInfo from '@site/src/components/FooterInfo';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';

function FooterLogo({sources, alt, width, height}) {
  return (
    <ThemedImage
      className="footer__logo"
      alt={alt}
      sources={sources}
      width={width}
      height={height}
    />
  );
}

function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {label}
    </Link>
  );
}

const FooterLinkColumn = ({column}) => {
  return (
    <div className="col footer__col">
      <div className="footer__title">{column.title}</div>
      <ul className="footer__items">
        {column.items.map((item, i) => (
          <li key={i} className="footer__item">
            <FooterLink {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

function Footer() {
  const {footer} = useThemeConfig();
  const {copyright, links = [], logo = {}} = footer || {};

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark',
      })}>
      <div className="container">
        {links && links.length > 0 && (
          <div className="row footer__links">
            {links.map((linkItem, i) => (
              <FooterLinkColumn column={linkItem} key={i} />
            ))}
          </div>
        )}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && (logo.src || logo.srcDark) && (
              <div className="margin-bottom--sm">
                {logo.href ? (
                  <Link
                    href={logo.href}
                    className={styles.footerLogoLink}>
                    <FooterLogo
                      alt={logo.alt}
                      sources={{
                        light: useBaseUrl(logo.src),
                        dark: useBaseUrl(logo.srcDark || logo.src),
                      }}
                      width={logo.width}
                      height={logo.height}
                    />
                  </Link>
                ) : (
                  <FooterLogo
                    alt={logo.alt}
                    sources={{
                      light: useBaseUrl(logo.src),
                      dark: useBaseUrl(logo.srcDark || logo.src),
                    }}
                    width={logo.width}
                    height={logo.height}
                  />
                )}
              </div>
            )}
            {copyright ? (
              <div
                className="footer__copyright"
                // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            ) : null}
          </div>
        )}
        
        {/* Add FooterInfo directly in the footer */}
        <FooterInfo />
      </div>
    </footer>
  );
}

export default React.memo(Footer);