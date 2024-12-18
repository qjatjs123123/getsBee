<div align="center">

<img src="https://github.com/user-attachments/assets/abd8a2d7-ba0c-46c0-8810-3c35ba90231d" width="600"/>

### Browsing Assist 기반 인사이트 공유 플랫폼 🖍️

[<img src="https://img.shields.io/badge/release-v0.0.0-ㅎㄱㄷ두?style=flat&logo=google-chrome&logoColor=white" />]() 
<br/> [<img src="https://img.shields.io/badge/프로젝트 기간-2024.07.02~2024.08.16-fab2ac?style=flat&logo=&logoColor=white" />]()

</div> 


## 📝 목차
- [1. 프로젝트 개요](#1-프로젝트-개요)
- [2. 담당 역할](#2-담당-역할)
- [3. 프로젝트 화면 구성](#3-프로젝트-화면-구성)
- [4. 사용한 기술 스택](#4-사용한-기술-스택)
- [5. 기술적 이슈와 해결 과정](#5-기술적-이슈와-해결-과정)
- [6. 팀원](#6-팀원)

다음과 같은 목차로 구성되어 있습니다.

<br />

## 🚀 프로젝트 개요
💡 **하이라이트 기반 스크랩 포스트 생성**
- 다양한 색상으로 웹 사이트의 본문에 하이라이트를 표시할 수 있습니다.
- getsBee에 접속하여 하이라이트한 내용을 확인하고 디렉토리 단위로 관리할 수 있습니다.

💡 **LLM을 통한 핵심 문장 추천**
- Gemini를 활용한 핵심 문장 추천 기능을 지원합니다.

💡 **디렉토리 기반 팔로우 시스템**
- 관심 있는 주제별 디렉토리를 팔로우하여 개인화된 피드를 구성할 수 있습니다.

💡 **AWS Personalize를 통한 추천 시스템**
- 사용자의 관심사에 맞는 포스트와 관련 포스트를 추천받을 수 있습니다.

💡 **Elasticsearch 기반 검색**
- Elasticsearch 기반 검색 엔진을 통해 더욱 향상된 검색 경험을 제공합니다.
<br />

## 👨‍💻 담당 역할
💡 **Browsing Assist 크롬 익스텐션 개발**
- 드래그 한 문구에 하이라이트 생성, 수정, 삭제

💡 **LLM 기반 핵심 문장 추천**
- 원클릭으로 페이지 본문 핵심 문장 추천

💡 **특정 도메인에서 확장 프로그램 기능의 활성화/비활성화 구현**
- 토글 버튼으로 특정 도메인에서 확장 프로그램 기능 활성화/비활성화 구현

💡 **페이지 접속 시 하이라이트 복원**
- 페이지 접속시 저장된 하이라이트 복원

<br />

## 🖥️ 화면 구성
|하이라이트 생성|
|:---:|
|<img src="https://github.com/user-attachments/assets/2f10f4b1-e644-46bb-b6d1-8f501be68b76" width="450"/>|
|Selection API를 활용하여 드래그 한 문구에 하이라이트 생성|


|하이라이트 수정/삭제|
|:---:|
|<img src="https://github.com/user-attachments/assets/455ccdcc-a942-4fe3-94de-38f0585c1b2a" width="450"/>|
|커스텀 태그마다 각 id를 부여하여 수정, 삭제 기능|

|LLM 기반 핵심 문장 추천|
|:---:|
|<img src="https://github.com/user-attachments/assets/537b9b82-d35b-4b61-9f18-f80c41c39410" width="450"/>|
|Gemini API, ReadAbility를 사용한 페이지 핵심 문장 추천|

|특정 도메인에서 확장 프로그램 기능의 활성화/비활성화 구현|
|:---:|
|<img src="https://github.com/user-attachments/assets/a1cc6c63-075d-4d4f-b93a-8d56d7abe738" width="450"/>|
|Chrome Storage API를 사용한 도메인 활성화/비활성화 구현|

|페이지 접속 시 하이라이트 복원|
|:---:|
|<img src="https://github.com/user-attachments/assets/b580b39b-1f1d-4815-8de2-2beb5f9ef80c" width="450"/>|
|S3를 활용한 하이라이트 복원 기능 구현|
<br />

## ⚙ 사용한 기술 스택
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/JavaScript.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/React.png?raw=true" width="80">
</div>

### Tools
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Github.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Notion.png?raw=true" width="80">
</div>

<br />

## 🤔 기술적 이슈와 해결 과정
> ### 드래그시 하이라이트 생성하기
> <img src="https://github.com/user-attachments/assets/542e9f4c-c796-4e2b-99a9-a2f44761c4a7" width="450"/> <br/>
> #### DOM트리 순회하여 드래그한 모든 TextNode에 커스텀태그를 추가한다. <br/>
> 1. Selection API를 사용하여 드래그한 Range객체를 찾고 Range객체에 포함된 모든 TextNode를 찾는다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#L108-L132)
> 2. Range 범위에 포함된 TextNode사이에 커스텀 태그 bee를 추가한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#L134-L166)
<br />

> ### 하이라이트 색 수정, 삭제하기
> 1. 하이라이트가 정상적으로 생성되면 백엔드로 부터 고유 id값을 부여받는다.
> 2. 하이라이트 생성될 때 받은 id값을 부여하여 태그를 생성한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#L160-L166)
> 3. 해당 태그에 이벤트를 건다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#L168-L202)
> 4. 해당 고유 id를 토대로 수정한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#L54-L66)
> 5. 해당 고유 id를 토대로 삭제한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#L40-L52)
<br />

> ### 크롬 익스텐션 탭과 ContentScript간 데이터 통신
> 1. ContentScript에서는 `chrome.runtime.sendMessage`로 크롬 익스텐션 탭에 메시지를 보낼 수 있다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/content.js#L79-L95)
> 2. ContentScript에서 `chrome.runtime.onMessage.addListener`로 크롬 익스텐션 탭 메시지를 받을 수 있다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/content.js#L196-L206)
> 3. background.js는 ContentScript와 크롬 익스텐션 간의 메시지 전송을 중개하는 역할을 백그라운드에서 수행한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/background.js#L4-L77)
> 4. 크롬 익스텐션에서는 ContentScript에 메시지를 `chrome.runtime.sendMessage`로 보낼 수 있다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/src/Content.js#L174-L177)
<br />

> ### 페이지 접속 시 하이라이트 복원
> >💡 **1. 하이라이트된 TextNode를 Node Tree에서 인덱스로 표현한다. ex)0,1,5,4,3**
> > - Node Tree를 순회하여 각 TextNode의 위치를 인덱스로 변환한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#14-L26)
> > - 변환된 인덱스를 기준으로 TextNode를 식별한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#28-L34)
> > - 해당 태그에 하이라이트 커스텀 태그를 추가한다.
> >  <br />
> > ⚠️ <strong style="color: red;">`에러`</strong>: 이 방법은 커스텀 태그가 삭제되거나 추가될 때 Node Tree의 인덱스가 변동되어 오류가 발생
> <br />
> 
> > 💡 **2. 브라우저에서 하이라이트의 상대적인 높이와 위치를 구한다.**
> > <br />
> > ⚠️ <strong style="color: red;">`에러`</strong>: 이 방법은 이미지나 정적 파일이 늦게 로드될 경우, 높이와 위치가 지속적으로 변경되는 오류가 발생
> <br />
> 
> > 💡 **3. S3를 활용하여 변경된 body 내용을 저장하고, 페이지 접속 시 이를 적용한다.**
> > <img src="https://github.com/user-attachments/assets/1678d118-0675-4e8f-85cc-cced694ecb6a" width="450"/>
> > - AWS 저장된 body태그를 적용한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/content.js#59-L78)
> >  <br />
> > ⚠️ <strong style="color: red;">`에러`</strong>: 이 방법은 내용이 수정되어도 변경되지 않음
<br />


## 💁‍♂️ 프로젝트 팀원
| **Backend** | **Backend** | **Backend** | **Frontend** | **Frontend** | **Frontend** |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![](https://github.com/hoshogi.png?width=120&height=120) | ![](https://github.com/dahyunko.png??width=120&height=120) | ![](https://github.com/wonchul98.png??width=120&height=120) | ![](https://github.com/qjatjs123123.png??width=120&height=120) | ![](https://github.com/chanhyun22.png??width=120&height=120) | ![](https://github.com/monghwadang.png??width=120&height=120) |
| [이호석](https://github.com/hoshogi) | [고다현](https://github.com/dahyunko) | [신원철](https://github.com/wonchul98) | [홍범선](https://github.com/qjatjs123123) | [변찬현](https://github.com/chanhyun22) | [김명화](https://github.com/monghwadang) |



## 📲 링크


| :: Chrome Web Store                                                           |
| :------------------------------------------------------------------------------------- |
| :: [getsBee Chrome Web Store Link](https://apps.apple.com/kr/app/onlypickone/id6469682692) |  

| :: Youtube                                                                  |
| :------------------------------------------------------------------------------------- |
| :: [Youtube Link](https://youtu.be/NwPTFSbICX0) | 

