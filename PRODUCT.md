# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router) + TypeScript + Tailwind CSS 4, chosen by the user. Static mock data in `src/data/`; deploy target Vercel. Portfolio project, built so later phases can add every remaining menu page on the same templates.

## Users

Primary: Korean Seventh-day Adventist members who visit daily. Mornings they check the day's Sabbath School lesson (안교교과), devotional (기도력, adult and children's), and Bible; on Sabbath they watch sermons and broadcasts; through the week they skim denominational news, obituaries (부고), and classifieds (구인·구직·알뜰시장). A large share is 60+, reading on phones and family PCs; children and youth use the kids' devotional and broadcasts.

Secondary (confirmed only as existing site audiences, not prioritized): pastors and staff (events, minutes, address book), and first-time visitors (bible study, find a church).

## Product Purpose

재림마을 is the Korean Union Conference's member portal: one place for news, broadcasts, faith resources, mission content, online bible study, local church updates, union administration, and a member community. The redesign proves the same full feature set can be calm, legible, and fast to navigate for every age. Success: a daily visitor reaches today's lesson/devotional in one tap, and any of the ~80 sub-menus within two.

## Positioning

The official portal of the Korean Adventist church: it carries the denomination's daily lesson and devotional calendar, union governance, and a member-only classifieds/obituary community that no general Christian portal has.

## Operating Context

Daily devotion ritual keyed to the date (교과 by day of week, 기도력 by date). Weekly Sabbath rhythm (Friday sunset to Saturday sunset) drives broadcast and sermon traffic. Content arrives from union departments, conferences (동중한·서중한·영남·충청·호남·제주), Hope Channel Korea, and local churches.

## Capabilities and Constraints

Must keep all current features (sitemap captured from adventist.or.kr, 2026-11-16):
- 뉴스: 교회·국제·종교계·시사·특별기획·기관·단체·종합·전체기사·지면보기
- 방송: 예배·설교·교과해설·선교지소식·어린이·기획·기도주일·집회·찬양·공연·홍보·지역교회설교·강의
- 신앙: 성경·찬미·예언의 신·기도력·교과·월간지·단행본·채널·성경필사·커뮤니티
- 선교: 일상형·신앙형·동영상 콘텐츠·디지털 전도지·사용자 콘텐츠·디자인 리소스
- 성경공부: 스마트북·전체/인기/최신 강의·청소년·어린이·서적 신청·온라인 성경 공부
- 지역교회 소식
- 한국연합회: 각 부 행사·교회 및 기관 행사·의사록·연합회에 바란다·연합회장 청원·메타버스·조직 및 연락처·교회주소록·재림교회 CI
- 커뮤니티: 공지사항·공감기도·게시판·자료실·토론방·구인·구직·부동산·알뜰시장·교우사업체·결혼/중매·부고
- Global: site search, login/join, popup notices, app download, SNS links, department/conference/agency links, footer legal pages.

Phase 1 scope: home, global nav + full menu + search, news list/detail, broadcast, today (lesson/devotional/bible), community board. Other menus link to a shared section template.

## Brand Commitments

User made the official CI binding (General Conference identity, adopted by NSD and Korean Union):
- Primary colors: Emperor #4b207f, Earth #5e3929, Grapevine #7f264a, Denim #2f557f, Campfire #e36520, Tree Frog #448d21, Ming #3e8391. Secondary: Warm #ffa92d, Cool #4d7549.
- Logo used in a single color.
- Creation Grid: layouts divided into seven vertical parts, parts 1–6 carry content, the 7th carries only the logo (remembering six days of creation and the Sabbath rest).
- Korean typeface specified as 아이리스체 (Advent Sans Type System counterpart); not freely licensed, so a stand-in face is used and noted.
- Naming rules: official name "제칠일안식일예수재림교", short form "재림교회"; never "SDA" as a church name.
- Portal name: 재림마을.

## Evidence on Hand

Real titles, menu labels, and structure captured from the live site (2026-11-16). Article bodies, view counts, names in community posts, and images are synthetic samples and must be labeled as such. No official logo file in the repo yet; must not be redrawn as if official.

## Product Principles

1. Today first: the date-keyed daily ritual is the front door.
2. Everything reachable, nothing shouting: full sitemap one layer away, home shows priorities only.
3. Readable by a 75-year-old on a phone without zooming; usable by a child.
4. The CI is a system, not a sticker: palette, Creation Grid, single-color mark.
5. Synthetic content is labeled; no invented claims about the church.

## Accessibility & Inclusion

WCAG 2.2 AA minimum, AAA contrast for body text in high-contrast mode. User-controllable text size (3 steps), high-contrast mode, light/dark. Touch targets ≥ 48px. Full keyboard navigation, skip link, screen-reader labels in Korean. Respect prefers-reduced-motion.
