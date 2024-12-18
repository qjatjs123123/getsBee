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
> DOM트리 순회하여 드래그한 모든 TextNode에 커스텀태그를 추가한다. <br/>
> 1. Selection API를 사용하여 드래그한 Range객체를 찾고 Range객체에 포함된 모든 TextNode를 찾는다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#L108-L132)
> 2. Range 범위에 포함된 TextNode사이에 커스텀 태그 bee를 추가한다. [코드 바로보기](https://github.com/qjatjs123123/getsBee/tree/main/frontend-extension/my-chrome-app/public/highlight.js#L134-L166)




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

