const mockHtml = `
<body cz-shortcut-listen="true">

<div id="wrapper" style="padding-top: 74px;">
    <div id="header">
        <div class="notice_banner">
            <div class="inner">
                <p class="notice">삼성전자 뉴스룸의 동영상 콘텐츠는 더 이상 Internet Explorer를 지원하지 않습니다. 최적의 시청 환경을 위해 <a href="https://www.youtube.com/supported_browsers" target="_blank">다른 웹브라우저</a> 사용을 권장합니다.</p>
                <button type="button" class="btn_notice_close">close</button>
            </div>
        </div>
  
        
        <div class="header_box">
            <div class="header_inner">
                <div class="header_wrap clearfix">
                    <a class="skip_nav transparent" href="#content_wrap">본문 바로가기</a>
                                        <p class="logo"><a href="https://news.samsung.com/kr/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 64">
    <title>Samsung Newsroom</title>
    <defs><style>.cls-1{fill:none;}</style></defs>
    <rect class="cls-1" width="317" height="64"></rect><path d="M7.26,22.64A8.64,8.64,0,0,1,3,21.69a11.35,11.35,0,0,1-3-2.38l3.16-2.38a5,5,0,0,0,1.76,1.78,4.38,4.38,0,0,0,2.32.62,2.8,2.8,0,0,0,2.1-.74,2.34,2.34,0,0,0,.72-1.68,1.48,1.48,0,0,0-.33-1,3,3,0,0,0-.86-.68,6.81,6.81,0,0,0-1.24-.5l-1.44-.45c-.63-.2-1.26-.41-1.88-.64a6.21,6.21,0,0,1-1.7-.93,4.67,4.67,0,0,1-1.22-1.43A4.34,4.34,0,0,1,.92,9.17a4.48,4.48,0,0,1,.46-2A5,5,0,0,1,2.66,5.49a6.23,6.23,0,0,1,2-1.1A7.55,7.55,0,0,1,7.08,4a9.07,9.07,0,0,1,2,.2,8,8,0,0,1,1.65.56,7.41,7.41,0,0,1,1.38.85A11,11,0,0,1,13.32,6.7L10.47,8.92A3.79,3.79,0,0,0,7.11,7.08a2.85,2.85,0,0,0-1.94.59,1.91,1.91,0,0,0-.66,1.46,1.41,1.41,0,0,0,.3.92,2.79,2.79,0,0,0,.83.65,7.22,7.22,0,0,0,1.21.51l1.46.47c.62.2,1.26.43,1.89.68a7.41,7.41,0,0,1,1.74,1,5.05,5.05,0,0,1,1.26,1.49A4.49,4.49,0,0,1,13.68,17a5.24,5.24,0,0,1-.43,2.08A5.52,5.52,0,0,1,12,20.9a6.26,6.26,0,0,1-2,1.26A7.3,7.3,0,0,1,7.26,22.64Z"></path><path d="M23.13,22.64a7.49,7.49,0,0,1-5-2,7.45,7.45,0,0,1-1.68-2.34,7.59,7.59,0,0,1-.64-3.16A7.62,7.62,0,0,1,16.42,12a7.08,7.08,0,0,1,4-3.81,7.9,7.9,0,0,1,2.74-.5,7,7,0,0,1,2.73.53A5.78,5.78,0,0,1,28,9.68v-2h3.44v14.9H28V20.5a5.52,5.52,0,0,1-2.09,1.57A6.64,6.64,0,0,1,23.13,22.64Zm.56-3.15a4.75,4.75,0,0,0,1.79-.34,4.09,4.09,0,0,0,1.4-.93,4.58,4.58,0,0,0,.93-1.39,4.2,4.2,0,0,0,.34-1.7,4.09,4.09,0,0,0-.34-1.67,4.42,4.42,0,0,0-.93-1.38,4.21,4.21,0,0,0-1.4-.92,4.83,4.83,0,0,0-3.56,0,4.47,4.47,0,0,0-1.44.91,4.07,4.07,0,0,0-.95,1.36,4.2,4.2,0,0,0-.35,1.7,4.25,4.25,0,0,0,.35,1.71,4.09,4.09,0,0,0,.95,1.39,4.49,4.49,0,0,0,1.44.92A4.73,4.73,0,0,0,23.69,19.49Z"></path><path d="M34.14,7.72h3.41V9.64a5.17,5.17,0,0,1,1.8-1.43,5.56,5.56,0,0,1,2.46-.52,6.08,6.08,0,0,1,3,.66,4.76,4.76,0,0,1,1.88,1.87,5.69,5.69,0,0,1,2-1.84,5.89,5.89,0,0,1,2.87-.69,5.91,5.91,0,0,1,4.53,1.64,6.32,6.32,0,0,1,1.53,4.49v8.8H54.09V14.13a3.75,3.75,0,0,0-.82-2.53,3,3,0,0,0-2.42-.93,3.17,3.17,0,0,0-2.34.95,3.88,3.88,0,0,0-.95,2.86v8.14H44.07V14a3.57,3.57,0,0,0-.79-2.46,2.93,2.93,0,0,0-2.34-.9,3.23,3.23,0,0,0-2.41,1,4,4,0,0,0-1,2.91v8.07H34.14Z"></path><path d="M65.8,22.64a8.32,8.32,0,0,1-4.1-.91,6.35,6.35,0,0,1-2.52-2.66l3.19-1.44a3.71,3.71,0,0,0,1.45,1.51,4.21,4.21,0,0,0,2.14.52,3,3,0,0,0,1.91-.51,1.52,1.52,0,0,0,.64-1.21.77.77,0,0,0-.3-.63,2.71,2.71,0,0,0-.76-.43,6.8,6.8,0,0,0-1.11-.3L65,16.31c-.65-.13-1.28-.28-1.9-.46a6.19,6.19,0,0,1-1.67-.74,4,4,0,0,1-1.2-1.21A3.56,3.56,0,0,1,59.79,12a3.42,3.42,0,0,1,.42-1.64A4.49,4.49,0,0,1,61.4,9a6,6,0,0,1,1.84-1,8,8,0,0,1,2.41-.35,7.6,7.6,0,0,1,3.73.83,6.25,6.25,0,0,1,2.36,2.26l-2.93,1.38A3.22,3.22,0,0,0,67.54,11a4,4,0,0,0-1.89-.44,2.9,2.9,0,0,0-1.81.47,1.32,1.32,0,0,0-.58,1.06c0,.47.29.81.86,1a19.81,19.81,0,0,0,2.55.65,16,16,0,0,1,1.85.45,6.63,6.63,0,0,1,1.69.75,4,4,0,0,1,1.24,1.21A3.47,3.47,0,0,1,71.92,18a3.84,3.84,0,0,1-.36,1.57,4.33,4.33,0,0,1-1.11,1.51,5.83,5.83,0,0,1-1.89,1.13A7.81,7.81,0,0,1,65.8,22.64Z"></path><path d="M87.33,22.62H83.92V20.75a5,5,0,0,1-1.78,1.39,5.78,5.78,0,0,1-2.5.5A5.45,5.45,0,0,1,75.45,21a6.46,6.46,0,0,1-1.54-4.6V7.72H77.4V16a4.25,4.25,0,0,0,.77,2.68,2.87,2.87,0,0,0,2.41,1,3.1,3.1,0,0,0,2.37-1,4.16,4.16,0,0,0,.94-2.93v-8h3.44Z"></path><path d="M90.08,7.72H93.5v2a5.54,5.54,0,0,1,1.87-1.5A5.83,5.83,0,0,1,98,7.69a5.69,5.69,0,0,1,4.34,1.65,6.38,6.38,0,0,1,1.57,4.6v8.68h-3.49V14.33a4,4,0,0,0-.84-2.68,3.16,3.16,0,0,0-2.53-1,3.35,3.35,0,0,0-2.48,1,4,4,0,0,0-1,2.94v8H90.08Z"></path><path d="M118.21,20.35A5.49,5.49,0,0,1,116.12,22a6.29,6.29,0,0,1-2.78.61,7.29,7.29,0,0,1-2.66-.5,7.19,7.19,0,0,1-2.35-1.46,7.32,7.32,0,0,1-1.69-2.34,7.59,7.59,0,0,1-.63-3.16,7.62,7.62,0,0,1,.62-3.18,7.06,7.06,0,0,1,4-3.81,7.81,7.81,0,0,1,2.74-.5,6.32,6.32,0,0,1,2.72.58,5.75,5.75,0,0,1,2.06,1.55V7.72h3.44V22.05a8.44,8.44,0,0,1-.49,2.92,6.71,6.71,0,0,1-1.47,2.38A6.89,6.89,0,0,1,117.25,29a8.71,8.71,0,0,1-3.32.59,10.27,10.27,0,0,1-2.64-.32,8,8,0,0,1-2.12-.89A7.55,7.55,0,0,1,107.51,27a8.37,8.37,0,0,1-1.22-1.72l3-1.86a6.64,6.64,0,0,0,1.84,2.24,4.7,4.7,0,0,0,2.8.74,4.2,4.2,0,0,0,1.76-.36,4,4,0,0,0,1.34-.94,4.25,4.25,0,0,0,.84-1.37,4.79,4.79,0,0,0,.29-1.63Zm-4.31-.86a4.75,4.75,0,0,0,1.79-.34,4.09,4.09,0,0,0,1.4-.93,4.58,4.58,0,0,0,.93-1.39,4.2,4.2,0,0,0,.34-1.7,4.09,4.09,0,0,0-.34-1.67,4.42,4.42,0,0,0-.93-1.38,4.21,4.21,0,0,0-1.4-.92,4.75,4.75,0,0,0-1.79-.34,4.8,4.8,0,0,0-1.77.34,4.47,4.47,0,0,0-1.44.91,4.31,4.31,0,0,0,0,6.16,4.49,4.49,0,0,0,1.44.92A4.8,4.8,0,0,0,113.9,19.49Z"></path><path d="M0,35.32H3.93L12,48V35.32h3.47V53.94h-3.7L3.47,40.86V53.94H0Z"></path><path d="M25.56,54a8.53,8.53,0,0,1-3.21-.58,7.41,7.41,0,0,1-2.49-1.58,7.21,7.21,0,0,1-1.61-2.38,7.48,7.48,0,0,1-.57-2.91,7.31,7.31,0,0,1,.6-3,7.38,7.38,0,0,1,1.64-2.39,8.1,8.1,0,0,1,2.46-1.6A7.93,7.93,0,0,1,25.43,39a8.59,8.59,0,0,1,3.08.54,7,7,0,0,1,4.6,6.66v1.22H21A4.39,4.39,0,0,0,22.52,50a4.67,4.67,0,0,0,3,1,4.36,4.36,0,0,0,4.13-2.62l2.83,1.63a7.68,7.68,0,0,1-2.71,2.92A7.77,7.77,0,0,1,25.56,54ZM25.43,42a5.08,5.08,0,0,0-2.69.69,3.7,3.7,0,0,0-1.59,1.81h8.47a3.17,3.17,0,0,0-1.48-1.86A5.3,5.3,0,0,0,25.43,42Z"></path><path d="M33.59,39h3.52l3.3,10.28L44.16,39h3.41l3.68,10.31L54.66,39h3.5L52.93,53.94H49.61L45.84,43.61,42,53.94H38.57Z"></path><path d="M65.25,54a8.33,8.33,0,0,1-4.11-.92,6.29,6.29,0,0,1-2.52-2.66L61.81,49a3.77,3.77,0,0,0,1.45,1.51A4.24,4.24,0,0,0,65.4,51a3.05,3.05,0,0,0,1.92-.51A1.52,1.52,0,0,0,68,49.26a.8.8,0,0,0-.3-.64,2.7,2.7,0,0,0-.76-.42,6.8,6.8,0,0,0-1.11-.3l-1.33-.27c-.65-.13-1.28-.29-1.9-.46a6.2,6.2,0,0,1-1.67-.75,3.85,3.85,0,0,1-1.2-1.21,3.47,3.47,0,0,1-.46-1.86,3.42,3.42,0,0,1,.42-1.64,4.38,4.38,0,0,1,1.19-1.4,5.69,5.69,0,0,1,1.85-1,8.55,8.55,0,0,1,6.15.48,6.25,6.25,0,0,1,2.36,2.26l-2.94,1.38A3.22,3.22,0,0,0,67,42.29a4,4,0,0,0-1.89-.44,3,3,0,0,0-1.81.46,1.36,1.36,0,0,0-.59,1.07c0,.48.29.81.87,1a19.81,19.81,0,0,0,2.55.65,16,16,0,0,1,1.85.45,7.41,7.41,0,0,1,1.69.75,3.91,3.91,0,0,1,1.24,1.22,3.36,3.36,0,0,1,.47,1.86A4,4,0,0,1,71,50.89a4.6,4.6,0,0,1-1.11,1.51A6,6,0,0,1,68,53.53,7.83,7.83,0,0,1,65.25,54Z"></path><path d="M73.49,39h3.42v2.22A3.85,3.85,0,0,1,80.73,39a5.48,5.48,0,0,1,1.47.18,5.1,5.1,0,0,1,1.16.46l-1.3,3.26a3.74,3.74,0,0,0-.85-.42A3.8,3.8,0,0,0,80,42.34a2.93,2.93,0,0,0-2.28.85A4.08,4.08,0,0,0,76.93,46v8H73.49Z"></path><path d="M91.86,54a7.9,7.9,0,0,1-3-.58,7.58,7.58,0,0,1-2.46-1.6,7.45,7.45,0,0,1-1.64-2.38,7.43,7.43,0,0,1,0-5.85,7.49,7.49,0,0,1,1.64-2.39,7.75,7.75,0,0,1,2.46-1.6,8.09,8.09,0,0,1,3-.58,7.81,7.81,0,0,1,5.47,2.18A7.55,7.55,0,0,1,99,43.56a7.43,7.43,0,0,1,0,5.85,7.5,7.5,0,0,1-1.66,2.38A7.81,7.81,0,0,1,91.86,54Zm0-3.24a4.37,4.37,0,0,0,3.08-1.25,4.1,4.1,0,0,0,.92-1.35,4.14,4.14,0,0,0,.33-1.64,4.2,4.2,0,0,0-.33-1.66,4.1,4.1,0,0,0-.92-1.35,4.45,4.45,0,0,0-4.8-.91,4.15,4.15,0,0,0-1.38.91,4.21,4.21,0,0,0-1.24,3,4.14,4.14,0,0,0,.33,1.64,4.23,4.23,0,0,0,.91,1.35,4,4,0,0,0,1.38.91A4.29,4.29,0,0,0,91.86,50.73Z"></path><path d="M109.1,54a7.81,7.81,0,0,1-3-.58,7.37,7.37,0,0,1-2.46-1.6A7.47,7.47,0,0,1,102,49.41a7.43,7.43,0,0,1,0-5.85,7.54,7.54,0,0,1,4.11-4,8,8,0,0,1,3-.58,7.91,7.91,0,0,1,3,.58,7.75,7.75,0,0,1,2.46,1.6,7.39,7.39,0,0,1,1.66,2.39,7.43,7.43,0,0,1,0,5.85,7.35,7.35,0,0,1-1.66,2.38,7.58,7.58,0,0,1-2.46,1.6A7.72,7.72,0,0,1,109.1,54Zm0-3.24a4.25,4.25,0,0,0,1.71-.34,4.2,4.2,0,0,0,1.38-.91,4.25,4.25,0,0,0,.92-1.35,4.14,4.14,0,0,0,.33-1.64,4.2,4.2,0,0,0-.33-1.66,4.25,4.25,0,0,0-.92-1.35,4.36,4.36,0,0,0-1.38-.91,4.42,4.42,0,0,0-1.71-.34,4.47,4.47,0,0,0-1.72.34,4.15,4.15,0,0,0-1.38.91,4.2,4.2,0,0,0-.9,1.35,4,4,0,0,0-.34,1.66,4,4,0,0,0,.34,1.64,4.2,4.2,0,0,0,.9,1.35,4,4,0,0,0,1.38.91A4.29,4.29,0,0,0,109.1,50.73Z"></path><path d="M119,39h3.42V41a5.17,5.17,0,0,1,1.8-1.43,5.56,5.56,0,0,1,2.46-.53,6.15,6.15,0,0,1,3,.67,4.7,4.7,0,0,1,1.88,1.87,5.6,5.6,0,0,1,2-1.84,6.74,6.74,0,0,1,7.41,1,6.32,6.32,0,0,1,1.54,4.49v8.81H139v-8.5a3.75,3.75,0,0,0-.82-2.53,3.06,3.06,0,0,0-2.42-.93,3.19,3.19,0,0,0-2.35,1,3.88,3.88,0,0,0-1,2.86v8.15h-3.49v-8.6a3.57,3.57,0,0,0-.79-2.46,3,3,0,0,0-2.35-.9,3.23,3.23,0,0,0-2.41,1,4,4,0,0,0-1,2.92v8.07H119Z"></path>
</svg>                    </a></p>
                    <div class="gnb_wrap clearfix">
                        <!-- gnb -->
                        <div id="gnb" class="clearfix view_web">
                            <nav class="nav">
                                <ul id="menu-gnb180625" class="main-menu"><li id="menu-item-376920" class="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor current-menu-parent current-post-parent menu-item-has-children menu-item-376920 active"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85">기업뉴스</a>
<ul class="sub-menu" style="">
	<li id="menu-item-376921" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376921 active"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85/%ea%b8%b0%ec%97%85%eb%ac%b8%ed%99%94">기업문화</a></li>
	<li id="menu-item-376922" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376922"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85/%ea%b8%b0%ec%88%a0">기술</a></li>
	<li id="menu-item-376923" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376923"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85/%eb%94%94%ec%9e%90%ec%9d%b8">디자인</a></li>
	<li id="menu-item-441857" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-441857"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85/%ea%b2%bd%ec%98%81%ec%9d%bc%eb%b0%98">경영일반</a></li>
</ul>
</li>
<li id="menu-item-376928" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-376928"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88">제품뉴스</a>
<ul class="sub-menu" style="">
	<li id="menu-item-376929" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376929 active"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%eb%aa%a8%eb%b0%94%ec%9d%bc">모바일</a></li>
	<li id="menu-item-376930" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376930"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%ec%8a%a4%eb%a7%88%ed%8a%b8tv">TV/디스플레이</a></li>
	<li id="menu-item-376931" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376931"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%ea%b0%80%ec%a0%84">가전</a></li>
	<li id="menu-item-376933" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376933"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%eb%b0%98%eb%8f%84%ec%b2%b4ssd">반도체</a></li>
	<li id="menu-item-376934" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376934"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%ea%b8%b0%ed%83%80">더 많은 제품</a></li>
</ul>
</li>
<li id="menu-item-441858" class="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor menu-item-has-children menu-item-441858"><a href="https://news.samsung.com/kr/category/%eb%af%b8%eb%9e%98%eb%8f%99%ed%96%89">미래동행</a>
<ul class="sub-menu" style="">
	<li id="menu-item-441859" class="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor current-menu-parent current-post-parent menu-item-441859 active"><a href="https://news.samsung.com/kr/category/%eb%af%b8%eb%9e%98%eb%8f%99%ed%96%89/%ec%82%ac%ed%9a%8c%ea%b3%b5%ed%97%8c">사회공헌</a></li>
	<li id="menu-item-441860" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-441860"><a href="https://news.samsung.com/kr/category/%eb%af%b8%eb%9e%98%eb%8f%99%ed%96%89/%ec%b9%9c%ed%99%98%ea%b2%bd">친환경</a></li>
	<li id="menu-item-441861" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-441861"><a target="_blank" href="https://www.samsung.com/sec/sustainability/main/">지속가능경영</a></li>
</ul>
</li>
<li id="menu-item-376941" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-376941"><a href="https://news.samsung.com/kr/category/%ed%94%84%eb%a0%88%ec%8a%a4%ec%84%bc%ed%84%b0">프레스센터</a>
<ul class="sub-menu" style="">
	<li id="menu-item-376945" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376945 active"><a href="https://news.samsung.com/kr/category/%ed%94%84%eb%a0%88%ec%8a%a4%ec%84%bc%ed%84%b0/%eb%b3%b4%eb%8f%84%ec%9e%90%eb%a3%8c">보도자료</a></li>
	<li id="menu-item-384944" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-384944"><a target="_blank" href="https://news.samsung.com/medialibrary/kr">미디어 라이브러리</a></li>
	<li id="menu-item-376942" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376942"><a href="https://news.samsung.com/kr/category/%ed%94%84%eb%a0%88%ec%8a%a4%ec%84%bc%ed%84%b0/%ec%9d%b4%ec%8a%88%ec%99%80-%ed%8c%a9%ed%8a%b8">이슈와 팩트</a></li>
	<li id="menu-item-379621" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-379621"><a href="https://news.samsung.com/kr/fast-facts">회사소개(Fast-Facts)</a></li>
</ul>
</li>
</ul>                            </nav>
                        </div> <!-- // .gnb -->
		<script>
		      jQuery( document ).ready( function() {
		        jQuery( 'ul.main-menu li:first-child' ).addClass( 'active' );
		      });
		</script>
                        <div class="btn_header_group clearfix">
                            <button class="btn_gnb_open" type="button">메뉴 열기</button>
                            <button class="btn_search" type="button" aria-controls="top_search" aria-expanded="false">검색 레이어 열기</button>
                            <a class="btn_nation" href="https://news.samsung.com/kr/select-newsroom">삼성 뉴스룸 국가 선택</a>
                        </div>
                    </div><!--// .gnb_wrap-->
                </div><!--// .header_wrap-->
            </div> <!-- // .header_inner -->

            <!-- Search -->
            <div id="top_search" class="top_search">
                <div class="top_search_inner">
                    <button type="button" class="btn_srch_close">검색 닫기</button>
                    <form role="search" method="get" id="searchform" name="searchform" action="https://news.samsung.com/kr/sp">
                        <fieldset>
                            <div class="srh_box" style="padding-right: 8px;">
                                <label for="query">검색</label>
                                <input type="text" id="query" placeholder="검색" value="" name="kw">
                                <button type="button" id="search_reset" class="search_reset_btn"><span>검색어 삭제</span></button>
                                <input type="hidden" id="rd" name="rd" value="1">
                                <input type="hidden" id="st" name="st" value="d">
                                <input type="hidden" id="ct" name="ct" value="all">
                                <button type="submit" onclick="javascript:searchSubmit();" class="btn_search btn_ro">검색</button>
                            </div>
                            <div class="srh_result">
    <ul>
<li><a href="https://news.samsung.com/kr/sp/?kw=CES+2025"><strong>CES 2025</strong></a></li><li><a href="https://news.samsung.com/kr/sp/?kw=%ED%8F%B4%EB%93%9C6"><strong>폴드6</strong></a></li><li><a href="https://news.samsung.com/kr/sp/?kw=AI"><strong>AI</strong></a></li><li><a href="https://news.samsung.com/kr/sp/?kw=One+UI"><strong>One UI</strong></a></li><li><a href="https://news.samsung.com/kr/sp/?kw=CSR"><strong>CSR</strong></a></li>    </ul>
</div>
                            <script>
                                jQuery( document ).ready( function() {
                                    var input2 = jQuery('input#query');
			if(jQuery('input#query').val()){
   			    jQuery('button#search_reset').addClass('active');			    
			}
                                    jQuery('button#search_reset').click(function(){
                                        input2.val("");
   			    jQuery('button#search_reset').removeClass('active');
			    jQuery('input#query').focus();
                                    });
                                });

			jQuery('input#query').keyup(function(){
  			  if(jQuery(this).val()){
				jQuery('button#search_reset').addClass('active');
				  }else{
				jQuery('button#search_reset').removeClass('active');
			  }
			});
                            </script>
                        </fieldset>
                    </form>
                    <button type="button" class="open_search_option" aria-expanded="false" style="display: none" aria-controls="search_option_select_wrap">상세검색</button> 
                    <div id="search_option_select_wrap" class="search_option_select_wrap">
                        <div class="search_option_list search_option1">
                            <button type="button" class="select_btn" aria-expanded="false" aria-controls="search_option1" title="검색 날짜별로 선택">날짜별</button>
                            <ul id="search_option1">
                                <li class="option0"><button type="button">날짜별</button></li>
                                <li class="option1"><button type="button">전체 날짜</button></li>
                                <li class="option2"><button type="button">1주일전</button></li>
                                <li class="option3"><button type="button">1개월전</button></li>
                                <li class="option4"><button type="button">1년전</button></li>
                                <li class="option5 custom"><button type="button" aria-expanded="false" aria-controls="srch_date">기간설정</button></li>
                            </ul>
                        </div>
                        <div class="search_option_list search_option2">
                            <button type="button" class="select_btn" aria-expanded="false" aria-controls="search_option2" title="검색 정렬 방식으로 선택">정렬방식</button>
                            <ul id="search_option2">
                                <li class="option0"><button type="button">정렬방식</button></li>
                                <li class="option1"><button type="button">최신순</button></li>
                                <li class="option3"><button type="button">인기순</button></li>
                            </ul>
                        </div>
                        <div class="search_option_list search_option3">
                            <button type="button" class="select_btn" aria-expanded="false" aria-controls="search_option3" title="검색 분류별로 선택">분류별</button>
                            <ul id="search_option3">
                                <li class="option0"><button type="button">분류별</button></li>
                                <li class="option1"><button type="button">전체</button></li>
                                <li class="option3"><button type="button">기획기사</button></li>
                                <li class="option2"><button type="button">보도자료</button></li>
                            </ul>
                        </div>
                    </div>

                    <!-- calendar -->
                    <div class="search_dimm"></div>
                    <div class="srch_date" id="srch_date" tabindex="0" style="left: 50%;">
                        <div class="wrap clearfix">
                            <div class="dates date_start date_show">
                                <div id="dp1736505576819" class="hasDatepicker"><div class="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="display: block;"><div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"><a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="이전 달"><span class="ui-icon ui-icon-circle-triangle-w">이전 달</span></a><a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="다음 달"><span class="ui-icon ui-icon-circle-triangle-e">다음 달</span></a><div class="ui-datepicker-title"><select class="ui-datepicker-year" data-handler="selectYear" data-event="change"><option value="2009">2009</option><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025" selected="selected">2025</option></select><select class="ui-datepicker-month" data-handler="selectMonth" data-event="change"><option value="0" selected="selected">1</option><option value="1">2</option><option value="2">3</option><option value="3">4</option><option value="4">5</option><option value="5">6</option><option value="6">7</option><option value="7">8</option><option value="8">9</option><option value="9">10</option><option value="10">11</option><option value="11">12</option></select></div></div><table class="ui-datepicker-calendar"><caption></caption><thead><tr><th scope="col" class="ui-datepicker-week-end"><span title="Sunday">일</span></th><th scope="col"><span title="Monday">월</span></th><th scope="col"><span title="Tuesday">화</span></th><th scope="col"><span title="Wednesday">수</span></th><th scope="col"><span title="Thursday">목</span></th><th scope="col"><span title="Friday">금</span></th><th scope="col" class="ui-datepicker-week-end"><span title="Saturday">토</span></th></tr></thead><tbody><tr><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">1</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">2</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">3</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">4</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">5</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">6</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">7</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">8</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">9</a></td><td class=" ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today" data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default ui-state-highlight ui-state-active ui-state-hover" href="#">10</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">11</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">12</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">13</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">14</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">15</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">16</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">17</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">18</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">19</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">20</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">21</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">22</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">23</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">24</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">25</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">26</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">27</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">28</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">29</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">30</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">31</a></td><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td></tr></tbody></table></div></div>
                                <label class="blind" for="date_start">검색기간 시작일</label>
                                <input type="text" id="date_start" readonly="readonly">
                            </div>
                            <span class="bar"></span>
                            <div class="dates date_end">
                                <div id="dp1736505576820" class="hasDatepicker"><div class="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="display: block;"><div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"><a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="이전 달"><span class="ui-icon ui-icon-circle-triangle-w">이전 달</span></a><a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="다음 달"><span class="ui-icon ui-icon-circle-triangle-e">다음 달</span></a><div class="ui-datepicker-title"><select class="ui-datepicker-year" data-handler="selectYear" data-event="change"><option value="2009">2009</option><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025" selected="selected">2025</option></select><select class="ui-datepicker-month" data-handler="selectMonth" data-event="change"><option value="0" selected="selected">1</option><option value="1">2</option><option value="2">3</option><option value="3">4</option><option value="4">5</option><option value="5">6</option><option value="6">7</option><option value="7">8</option><option value="8">9</option><option value="9">10</option><option value="10">11</option><option value="11">12</option></select></div></div><table class="ui-datepicker-calendar"><caption></caption><thead><tr><th scope="col" class="ui-datepicker-week-end"><span title="Sunday">일</span></th><th scope="col"><span title="Monday">월</span></th><th scope="col"><span title="Tuesday">화</span></th><th scope="col"><span title="Wednesday">수</span></th><th scope="col"><span title="Thursday">목</span></th><th scope="col"><span title="Friday">금</span></th><th scope="col" class="ui-datepicker-week-end"><span title="Saturday">토</span></th></tr></thead><tbody><tr><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">1</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">2</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">3</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">4</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">5</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">6</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">7</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">8</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">9</a></td><td class=" ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today" data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default ui-state-highlight ui-state-active ui-state-hover" href="#">10</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">11</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">12</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">13</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">14</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">15</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">16</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">17</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">18</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">19</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">20</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">21</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">22</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">23</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">24</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">25</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">26</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">27</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">28</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">29</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">30</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="0" data-year="2025"><a class="ui-state-default" href="#">31</a></td><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td></tr></tbody></table></div></div>
                                <label class="blind" for="date_end">검색기간 종료일</label>
                                <input type="text" id="date_end" readonly="readonly">
                            </div>
                        </div>
                        <div class="btns">
                            <button type="button" class="btn_ok btn_ro">확인</button>
                            <button type="button" class="btn_cancel btn_ro">취소</button>
                        </div>
                    </div>
                </div><!-- // .top_search_inner -->
	<button class="search_btn_close" type="button">검색창닫기</button>
            </div><!-- //.top_search -->

        </div><!-- //.header_box -->
    </div> <!-- header -->
<div class="overay"></div>

    <div id="content_wrap">
        <div id="container">
            <div id="content" class="single" style="min-height: 375px;">
                <div class="content_view">
                    <h1 class="title">[글로벌] 삼성전자 동남아총괄 임직원, 미얀마 어린이에게 사랑 전하다</h1>                    <div class="top_area clearfix">
                        <div class="meta">
                            <span>2015/10/13</span>                        </div>

                        <div class="etc">
                            
                            <div class="share_wrap">
                                <span class="label">공유하기</span>
                                <a href="javascript:;" class="btn_share">공유 레이어 열기</a>
                                <button class="btn_print" type="button" title="새창으로열림">인쇄하기</button>
                            </div>
                        </div>

                    </div>
                    <!-- //.top_area -->

                        <a href="javascript:;" class="btn_share_open">공유 레이어 열기/닫기</a>
                        <div class="sns_box clearfix">
                            <div class="sns_box_inner">
                                <ul>
                                    <li><a href="https://www.facebook.com/sharer.php?u=http%3A%2F%2Fbit.ly%2F30Yo4H0" target="_blank" title="새 창으로 페이스북에 공유하기">
                                            <div class="svg_icon">
                                                <img src="https://img.global.news.samsung.com/image/icon_svg/ico_facebook_bk.svg" alt="" data-name="https://img.global.news.samsung.com/image/icon_svg/ico_facebook">
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/intent/tweet?text=RT+%40SamsungNewsroom+%5B%EA%B8%80%EB%A1%9C%EB%B2%8C%5D+%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90+%EB%8F%99%EB%82%A8%EC%95%84%EC%B4%9D%EA%B4%84+%EC%9E%84%EC%A7%81%EC%9B%90%2C+%EB%AF%B8%EC%96%80%EB%A7%88+%EC%96%B4%EB%A6%B0%EC%9D%B4%EC%97%90%EA%B2%8C+%EC%82%AC%EB%9E%91+%EC%A0%84%ED%95%98%EB%8B%A4+http%3A%2F%2Fbit.ly%2F30Yo4H0+%23SamsungNewsroom" target="_blank" title="새 창으로 X에 공유하기">
                                            <div class="svg_icon">
                                                <img src="https://img.global.news.samsung.com/image/icon_svg/ico_twitter_bk.svg" alt="" data-name="https://img.global.news.samsung.com/image/icon_svg/ico_twitter">
                                            </div>
                                        </a>
                                    </li>
                                    <li><a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fbit.ly%2F30Yo4H0" target="_blank" title="새 창으로 링크드인에 공유하기">
                                            <div class="svg_icon">
                                                <img src="https://img.global.news.samsung.com/image/icon_svg/ico_linkedin_bk.svg" alt="" data-name="https://img.global.news.samsung.com/image/icon_svg/ico_linkedin">
                                            </div>
                                        </a>
                                    </li>
                                    <li><a href="mailto:?subject=%5B%EA%B8%80%EB%A1%9C%EB%B2%8C%5D%20%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EB%8F%99%EB%82%A8%EC%95%84%EC%B4%9D%EA%B4%84%20%EC%9E%84%EC%A7%81%EC%9B%90%2C%20%EB%AF%B8%EC%96%80%EB%A7%88%20%EC%96%B4%EB%A6%B0%EC%9D%B4%EC%97%90%EA%B2%8C%20%EC%82%AC%EB%9E%91%20%EC%A0%84%ED%95%98%EB%8B%A4&amp;body=http%3A%2F%2Fbit.ly%2F30Yo4H0" title="이메일로 공유하기">
                                            <div class="svg_icon">
                                                <img src="https://img.global.news.samsung.com/image/icon_svg/ico_mail_bk.svg" alt="" data-name="https://img.global.news.samsung.com/image/icon_svg/ico_mail">
                                            </div>
                                        </a>
                                    </li>
                                    <li class="share_mo">
                                        <a id="share_kakaotalk" href="javascript:;" target="_blank" title="새 창으로 카카오톡에 공유하기">
                                            <div class="svg_icon">
                                                <img src="https://img.global.news.samsung.com/image/icon_svg/ico_kakaotalk_bk.svg" alt="" data-name="https://img.global.news.samsung.com/image/icon_svg/ico_kakaotalk">
                                            </div>
                                        </a>
                                    </li>
                                    <li class="share_mo">
                                        <a href="https://line.naver.jp/R/msg/text/?%5B%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90+%EB%89%B4%EC%8A%A4%EB%A3%B8%5D%5B%EA%B8%80%EB%A1%9C%EB%B2%8C%5D+%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90+%EB%8F%99%EB%82%A8%EC%95%84%EC%B4%9D%EA%B4%84+%EC%9E%84%EC%A7%81%EC%9B%90%2C+%EB%AF%B8%EC%96%80%EB%A7%88+%EC%96%B4%EB%A6%B0%EC%9D%B4%EC%97%90%EA%B2%8C+%EC%82%AC%EB%9E%91+%EC%A0%84%ED%95%98%EB%8B%A4%0D%0Ahttp%3A%2F%2Fbit.ly%2F30Yo4H0" target="_blank" title="새 창으로 라인에 공유하기">
                                            <div class="svg_icon">
                                                <img src="https://img.global.news.samsung.com/image/icon_svg/ico_line_bk.svg" alt="" data-name="https://img.global.news.samsung.com/image/icon_svg/ico_line">
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="http">
                                    <div class="pc_url_copy">
                                        <label class="blind" for="input_copy1">현재 페이지 주소</label>
                                        <input type="text" class="input_copy" id="input_copy1" value="http://bit.ly/30Yo4H0" readonly="">
                                        <button type="button" class="btn_copy" data-clipboard-target="#input_copy1">주소복사</button>
                                    </div>
                                    <div class="mo_url_copy">
                                        <div class="input_copy">
                                            <span class="url_copied">주소가 복사되었습니다.</span>
                                            <label class="blind" for="input_copy2">현재 페이지 주소</label>
                                            <input type="text" class="input_url_copy" id="input_copy2" value="http://bit.ly/30Yo4H0" readonly="">
                                        </div>
                                        <button type="button" class="btn_copy" data-clipboard-target="#input_copy2">주소복사 팝업 열기</button>
                                    </div>
                                </div>
                                <button type="button" class="btn_sns_close">공유 레이어 닫기</button>
                            </div>
                        </div>

                    <div class="text_cont">
                        
                        <p>
	지난 3일, 삼성전자 동남아총괄 산하 임직원 50여 명이 미얀마(Myanmar) 어린이들에게 사랑을 전하기 위해 한자리에 모였습니다. 삼성전자 자원봉사 프로그램 ‘러브앤드케어(Love and Care)’에 참여하기 위해서였는데요. 러브앤드케어는 삼성 글로벌 자원봉사 페스티벌 프로그램 중 하나로&nbsp;진행됐습니다.
</p>
<p style="text-align: center;">
	<a href="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%997.jpg" rel="" style="" target="" title=""><img alt="삼성전자 자원봉사 프로그램 ‘러브앤드케어’가 진행된 미얀마 판 표 레트&nbsp;모나스틱 학교 학생들과 찍은 단체사진입니다." class="aligncenter size-full wp-image-250715" height="325" src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%997.jpg" style="opacity: 1;" title="" width="849" srcset="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%997.jpg 849w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%997-680x260.jpg 680w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%997-300x115.jpg 300w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%997-158x60.jpg 158w" sizes="(max-width: 849px) 100vw, 849px"></a> <span style="font-size:12px;">▲삼성전자 자원봉사 프로그램 ‘러브앤드케어’가 진행된 미얀마 판 표 레트&nbsp;모나스틱 학교 학생들과 함께</span>
</p>
<p>
	삼성전자 동남아총괄 직원들은 미얀마 소재 판 표 레트&nbsp;모나스틱(Pann Pyo Let Monastic) 학교를 방문, 재학생 400여 명에게 음식과 학용품을 전달하고 다양한 교육 활동을 펼쳤는데요.
</p>
<p style="text-align: center;">
	<a href="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%995.jpg" rel="" style="" target="" title=""><img alt="카메라를 향해 포즈를 취한 미얀마 학생들입니다." class="aligncenter size-full wp-image-250713" height="510" src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%995.jpg" style="opacity: 1;" title="" width="849" srcset="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%995.jpg 849w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%995-680x408.jpg 680w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%995-300x180.jpg 300w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%995-158x95.jpg 158w" sizes="(max-width: 849px) 100vw, 849px"></a> <span style="font-size:12px;">▲쉬는 시간, 밝은 표정으로 카메라를 향해 포즈를 취한 학생들</span>
</p>
<p>
	아이린 응(Irene Ng) 삼성전자 동남아총괄 마케팅 담당 상무는 “삼성전자 동남아총괄의 사회공헌 활동 중 하나인 러브앤드케어 프로그램의 시작을 미얀마 어린이들과 함께하게 돼 기쁘다”고 말했습니다. 또한 그는 “이번 기회를 통해 삼성전자의 지식과 기술을 이곳 학생들에게 보다 효과적으로 전달할 수 있어 뿌듯하다”고 덧붙였습니다.
</p>
<p style="text-align: center;">
	<a href="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%994.jpg" rel="" style="" target="" title=""><img alt="삼성 태블릿 기기로 삼성전자 임직원 자원봉사자에게 영어를 배우는 학생들입니다." class="aligncenter size-full wp-image-250712" height="510" src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%994.jpg" style="opacity: 1;" title="" width="849" srcset="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%994.jpg 849w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%994-680x408.jpg 680w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%994-300x180.jpg 300w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%994-158x95.jpg 158w" sizes="(max-width: 849px) 100vw, 849px"></a> <span style="font-size:12px;">▲삼성 태블릿 기기로 삼성전자 임직원 자원봉사자에게 영어를 배우는 학생들</span>
</p>
<p style="text-align: center;">
	<a href="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%996.jpg" rel="" style="" target="" title=""><img alt="프로그램을 즐기는 미얀마 학생들입니다." class="aligncenter size-full wp-image-250714" height="510" src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%996.jpg" style="opacity: 1;" title="" width="849" srcset="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%996.jpg 849w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%996-680x408.jpg 680w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%996-300x180.jpg 300w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%996-158x95.jpg 158w" sizes="(max-width: 849px) 100vw, 849px"></a> <span style="font-size:12px;">▲이번 프로그램 일정엔 삼성전자 임직원과 함께 게임을 즐기는 시간도 포함돼 학생들을 더욱 즐겁게 했습니다</span>
</p>
<p>
	이번 프로그램에 참여한 임직원은 삼성 태블릿 기기를 활용, 학생들과 함께 △영어 공부 △모래 페인팅 △의자 놀이 등 다양한 프로그램을 즐겼는데요. 태블릿을 처음 접해본 어린이들은 다소 어색해하기도 했지만 금세 행복한 표정을 지으며 프로그램에 집중했습니다.
</p>
<p>
	이날 삼성전자는 학교 측에 TV와 태블릿을 기증하고 학생들에게 학용품을 나눠주며 봉사활동을 마무리했는데요.
</p>
<p style="text-align: center;">
	<a href="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%993.jpg" rel="" style="" target="" title=""><img alt="선물을 받고 즐거워하는 학생들입니다." class="aligncenter size-full wp-image-250711" height="510" src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%993.jpg" style="opacity: 1;" title="" width="849" srcset="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%993.jpg 849w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%993-680x408.jpg 680w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%993-300x180.jpg 300w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%993-158x95.jpg 158w" sizes="(max-width: 849px) 100vw, 849px"></a> <span style="font-size:12px;">▲삼성전자 측이 준비한 선물을 받고 즐거워하는 학생들</span>
</p>
<p style="text-align: center;">
	<a href="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%991.jpg" rel="" style="" target="" title=""><img alt="아쉰 핀 니유 반타 교장에게 대형 삼성 TV를 전달하고 있습니다." class="aligncenter size-full wp-image-250709" height="510" src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%991.jpg" style="opacity: 1;" title="" width="849" srcset="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%991.jpg 849w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%991-680x408.jpg 680w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%991-300x180.jpg 300w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%991-158x95.jpg 158w" sizes="(max-width: 849px) 100vw, 849px"></a> <span style="font-size:12px;">▲안남식 삼성전자 동남아총괄 미얀마지점장(사진 오른쪽)은 '러브앤드케어' 프로그램 종료 직후 아쉰 핀 니유 반타 교장에게 "교육용 기자재로 써달라"며 대형 삼성 TV를 전달했습니다</span>
</p>
<p>
	아쉰 핀 니유 반타(Ashin Phin Nyaw BhanTha) 판 표 레트&nbsp;모나스틱 학교장은 “삼성전자 임직원과 학생들이 함께 보낸 시간은 비록 짧았지만 임직원이 학생들에게 보여준 진심은 오랫동안 기억될 것”이라며 “사랑을 베풀어준 삼성전자 임직원에게 정말 감사하다”고 말했습니다. 이어서 그는 “삼성전자가 기증한 최첨단 TV와 태블릿 덕분에 학생들에게 세계 각국에서 벌어지는 다양한 얘기들을 더욱 생생하게 전할 수 있게 됐다”며 거듭 감사의 마음을 전했습니다.
</p>
<p style="text-align: center;">
	<a href="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%992.jpg" rel="" style="" target="" title=""><img alt="아쉰 핀 니유 반타 교장입니다." class="aligncenter size-full wp-image-250710" height="510" src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%992.jpg" style="opacity: 1;" title="" width="849" srcset="https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%992.jpg 849w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%992-680x408.jpg 680w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%992-300x180.jpg 300w, https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EC%9E%84%EC%A7%81%EC%9B%90%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%992-158x95.jpg 158w" sizes="(max-width: 849px) 100vw, 849px"></a> <span style="font-size:12px;">▲아쉰 핀 니유 반타 교장은 “삼성전자가 기증한 최첨단 교육 기자재 덕분에 학생들에게 더 많은 걸 가르칠 수 있게 됐다”며 고마워했습니다</span>
</p>
<p id="testID">
	안남식 삼성전자 동남아총괄 미얀마지점장(부장)은 “삼성전자는 러브앤드케어 프로그램뿐 아니라 다양한 사회 공헌 활동을 통해 미얀마에서 더욱 사랑 받는 브랜드가 되도록 노력할 것”이라고 말했습니다.
</p>
<p>
	삼성전자는 러브앤드케어 프로그램 외에도 미얀마에서 다양한 시티즌십(citizenship) 프로그램을 진행 중인데요. 올 초 얀곤(Yangon) 지역에선 현지 비정부기구(NGO)와 함께 진행한 ‘모바일 교육 프로젝트’를 통해 교육 혜택을 받지 못한 현지 어린이들에게 삼성 태블릿으로 컴퓨터∙글쓰기∙산수 등을 가르치기도 했습니다. 어린 학생들이 보다 편안한 환경에서 교육 혜택을 받을 수 있도록 도운 거죠.
</p>
<p>
	최근엔 미얀마 바고(Bago) 지역에서 에예르와디(Ayerwaddy) 지역 홍수 피해 복구를 위해 적십자사와 함께 ‘미얀마 홍수 구호 캠페인’을 펼쳤는데요. TV 기증, 무료 가전제품 수리 등 다양한 방식으로 사회공헌 활동을 진행했습니다.
</p>
<p>
	삼성전자 동남아총괄은 앞으로도 더욱 활발한 사회공헌 활동으로 지역 사회에 사랑을 전할 예정인데요. 삼성투모로우 독자 여러분도 많은 관심과 응원 보내주시기 바랍니다.</p>

                                <div class="content_banner">
            <a href="https://youtu.be/Cyet9NFAWs0" target="_blank" title="새 창으로 열기">                <img src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2023/11/CSR.jpg" alt="같이 나누고 함께 성장하는 것이 세계 최고를 향한 길입니다." style="opacity: 1;">
                </a>        </div>
                        </div><!-- //.text_cont -->
                                            <div class="top_area clearfix">
                            <p class="hash"><span class="title">TAGS</span><a href="https://news.samsung.com/kr/tag/%eb%8f%99%eb%82%a8%ec%95%84%ec%b4%9d%ea%b4%84" rel="tag">동남아총괄</a><a href="https://news.samsung.com/kr/tag/%ec%82%ac%ed%9a%8c%ea%b3%b5%ed%97%8c" rel="tag">사회공헌</a><a href="https://news.samsung.com/kr/tag/%ec%82%bc%ec%84%b1%ec%a0%84%ec%9e%90" rel="tag">삼성전자</a><a href="https://news.samsung.com/kr/tag/%ec%82%bc%ec%84%b1%ec%a0%84%ec%9e%90-%eb%b8%94%eb%a1%9c%ea%b7%b8" rel="tag">삼성전자 블로그</a><a href="https://news.samsung.com/kr/tag/%ec%82%bc%ec%84%b1%ed%88%ac%eb%aa%a8%eb%a1%9c%ec%9a%b0" rel="tag">삼성투모로우</a></p>
                        </div>
                                        <div class="category_list">
                        <p><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85"><span class="now">기업뉴스</span></a></p><p>미래동행 &gt; <a href="https://news.samsung.com/kr/category/%eb%af%b8%eb%9e%98%eb%8f%99%ed%96%89/%ec%82%ac%ed%9a%8c%ea%b3%b5%ed%97%8c"><span class="now">사회공헌</span></a></p>                    </div>

                    
<script type="text/javascript">

    jQuery(document).ready(function($) {
        pressImgResize(); // press release file download resize - 160212 _ddody//
    });

    // press release file download resize function - 160212 _ddody//
    function pressImgResize() {
        var $width = jQuery(window).width();
        var pressRatio = parseFloat( 117/170 ).toFixed(3);
        var pressWidth = jQuery(".list_img .img_wrap").width();
        var pressHeight = Math.round( pressWidth * pressRatio );
        var pressImgWidth = jQuery(".list_img .img_wrap img").width();
        var pressImgHeight = jQuery(".list_img .img_wrap img").height();
        jQuery(".list_img .img_wrap").height(pressHeight);
    }

    // press release file download resize - 160212 _ddody//
    jQuery(window).resize(function($){
        pressImgResize();
    });

</script>

                    
                </div><!-- //.content_view -->
                <!-- 하단 컨택정보 -->
                <div class="more_box_notice">
                    <p>삼성전자 뉴스룸의 직접 제작한 기사와 이미지는 누구나 자유롭게 사용하실 수 있습니다. <br>
                       그러나 삼성전자 뉴스룸이 제공받은 일부 기사와 이미지는 사용에 제한이 있습니다. <br>
                        <a href="https://news.samsung.com/kr/삼성전자-뉴스룸-콘텐츠-이용에-대한-안내">&lt;삼성전자 뉴스룸 콘텐츠 이용에 대한 안내 바로가기&gt;</a>
                    </p>
                </div>
            </div><!-- //#content -->

            <div class="btn_single">
                <a href="https://news.samsung.com/kr/latest">최신 기사 더보기</a>
            </div>

        </div><!-- //#container -->
    </div><!-- //#content_wrap -->

<script type="text/javascript">

    jQuery(document).ready(function($) {
        $(".btn_print").on('click', function(){
            var objWin = window.open('', 'print');
            var data = {'action' : 'print_post', 'post_uri' : location.href };

            $.post("https://news.samsung.com/kr/wp-admin/admin-ajax.php", data, function(response){
                objWin.document.write(response);
                objWin.document.close();
            });
        });



        if (jQuery.browser.mobile) {
            $(".share_mo").addClass("show");
        }

    });

    /* 카카오톡 공유하기 */
    var short_url = "http://bit.ly/30Yo4H0";
    var link_title = "[글로벌] 삼성전자 동남아총괄 임직원, 미얀마 어린이에게 사랑 전하다";
    var thumb_info = "https://img.kr.news.samsung.com/kr/wp-content/uploads/2015/10/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_%EB%AF%B8%EC%96%80%EB%A7%88-%EC%95%88%EB%82%A8%EC%8B%9D-%EC%A7%80%EC%A0%90%EC%9E%A5%EC%9D%B4-TV%EB%A5%BC-%EC%A6%9D%EC%A0%956-680x453.jpg";

    if( window.location.hostname == "dev-newsroom-trizeconsulting-alb-2098594885.us-west-2.elb.amazonaws.com" ) {
        Kakao.init("5176adf8482d8790a4704019b00bbc31"); // 개발기
    } else {
        Kakao.init("4251fab2dcc5508e97673e13936beaca"); // 상용기
    }

    Kakao.Link.createDefaultButton({
        installTalk: true,
        container: '#share_kakaotalk',
        objectType: 'feed',
        content: {
            title: link_title,
            imageUrl: thumb_info,
            link: {
                mobileWebUrl: short_url,
                webUrl: short_url
            }
        },
        installTalk: true
    });
</script>
<div id="footer">
    <div class="foo_inner clearfix">
        <div class="top">
            <p class="logo_samsung">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 370 60" style="enable-background:new 0 0 370 60;" xml:space="preserve">
    <title>SAMSUNG</title>
    <g>
        <g>
            <path fill="#fff" d="M305.6,44.7h-0.3L293.2,3.8h-19.5v51.5h12.9L285.9,13h0.3l13,42.3h18.7V3.8h-13L305.6,44.7z M57.3,3.8l-9.8,52h14.2
			L69,8.6h0.3l7,47.2h14.1l-9.7-52H57.3z M136.8,3.8l-6.5,39.8H130l-6.5-39.8h-21.4l-1.2,52h13.2l0.3-46.8h0.3l8.8,46.8h13.3
			l8.8-46.8h0.3l0.3,46.8h13.2l-1.2-52H136.8z M15,17.2c-0.2-1-0.2-2.2-0.1-2.7c0.4-1.7,1.5-3.5,4.8-3.5c3.1,0,4.9,1.9,4.9,4.7v3.2
			h13.1v-3.7C37.8,3.9,27.5,2.1,20,2.1c-9.4,0-17,3.1-18.4,11.6c-0.4,2.3-0.4,4.4,0.1,7c2.3,10.6,21,13.7,23.7,20.4
			c0.5,1.3,0.4,2.9,0.1,3.9c-0.4,1.7-1.6,3.5-5.1,3.5c-3.3,0-5.3-1.9-5.3-4.7l0-5H1l0,4c0,11.6,9.2,15.1,19.1,15.1
			c9.5,0,17.3-3.2,18.6-11.9c0.6-4.5,0.2-7.4-0.1-8.5C36.4,26.5,16.5,23.3,15,17.2z M186.1,17.3c-0.3-1-0.2-2.1-0.1-2.7
			c0.4-1.7,1.5-3.5,4.8-3.5c3.1,0,4.8,1.9,4.8,4.7V19h13v-3.6c0-11.2-10.2-13-17.6-13c-9.2,0-16.8,3-18.2,11.4
			c-0.4,2.3-0.4,4.3,0.1,6.9c2.3,10.5,20.8,13.6,23.4,20.2c0.5,1.2,0.3,2.8,0.1,3.8c-0.4,1.7-1.6,3.4-5.1,3.4
			c-3.3,0-5.2-1.8-5.2-4.7l0-5h-14l0,4c0,11.5,9.1,15,18.9,15c9.4,0,17.2-3.2,18.4-11.8c0.6-4.5,0.2-7.4-0.1-8.4
			C207.3,26.6,187.5,23.4,186.1,17.3z M259,3.8h-13.3v38.5c0,0.7,0,1.4-0.1,2c-0.3,1.3-1.4,3.8-5,3.8c-3.7,0-4.8-2.5-5-3.8
			c-0.1-0.6-0.1-1.3-0.1-2V3.8h-13.3v37.3c0,1,0.1,2.9,0.1,3.4c0.9,9.7,8.7,12.9,18.4,12.9c9.7,0,17.4-3.2,18.3-12.9
			c0.1-0.5,0.1-2.5,0.1-3.4V3.8z M350.4,26.6v7.6h5.4v7.5c0,0.7,0,1.4-0.1,2c-0.2,1.4-1.6,3.8-5.4,3.8c-3.8,0-5.1-2.4-5.4-3.8
			c-0.1-0.6-0.1-1.3-0.1-2V18c0-0.9,0.1-1.8,0.2-2.5c0.3-1.3,1.4-3.8,5.2-3.8c4,0,5,2.6,5.3,3.8c0.2,0.7,0.2,2,0.2,2v2.9h13.3v-1.7
			c0,0,0-1.8-0.1-3.4c-1-9.8-9.1-12.9-18.5-12.9c-9.3,0-17.3,3.1-18.5,12.9c-0.1,0.9-0.2,2.5-0.2,3.4v21.9c0,1,0,1.7,0.2,3.4
			c0.9,9.5,9.2,12.9,18.5,12.9c9.3,0,17.6-3.4,18.5-12.9c0.2-1.7,0.2-2.4,0.2-3.4V26.6H350.4z"></path>
        </g>
    </g>
</svg>            </p>
            <ul class="terms">
                <li class="sitemap"><a href="javascript:void(0);" class="btn_sitemap" title="사이트맵 보기">사이트맵</a></li>
                <li><a href="https://news.samsung.com/kr/삼성전자-뉴스룸-운영-정책">삼성전자 뉴스룸 운영 정책</a></li>
                <li class="noborder_m"><a href="https://news.samsung.com/kr/개인정보처리방침">개인정보처리방침</a></li>
                <li class="block noborder"><a href="https://news.samsung.com/kr/삼성전자-뉴스룸-콘텐츠-이용에-대한-안내">삼성전자 뉴스룸 콘텐츠 이용에 대한 안내</a></li>
            </ul>
            <div class="line"></div>
            <ul class="address">
                <li class="block">삼성전자 주식회사</li>
                <li class="block">대표번호: 02-2255-0114</li>
                <li class="copyright noborder">Copyright© 2010-2025 SAMSUNG All Rights Reserved.</li>
            </ul>
        </div>
        <div class="bottom">
            <ul class="sns_link">
                <li><a href="https://www.youtube.com/user/samsungtomorrow/" target="_blank" title="삼성전자 뉴스룸 유튜브">
                        <div class="svg_icon">
                            <img src="https://img.global.news.samsung.com/image/icon_svg/ico_youtube_wh.svg" alt="">
                        </div>
                    </a>
                </li>
                <li><a href="https://www.instagram.com/samsungnewsroom/" target="_blank" title="삼성전자 뉴스룸 인스타그램">
                        <div class="svg_icon">
                            <img src="https://img.global.news.samsung.com/image/icon_svg/ico_instagram_wh.svg" alt="">
                        </div>
                    </a>
                </li>
                <li><a href="https://www.facebook.com/SamsungNewsroom/" target="_blank" title="삼성전자 뉴스룸 페이스북">
                        <div class="svg_icon">
                            <img src="https://img.global.news.samsung.com/image/icon_svg/ico_facebook_wh.svg" alt="">
                        </div>
                    </a>
                </li>
                <li><a href="https://twitter.com/samsungnewsroom/" target="_blank" title="삼성전자 뉴스룸 X">
                        <div class="svg_icon">
                            <img src="https://img.global.news.samsung.com/image/icon_svg/ico_twitter_wh.svg" alt="">
                        </div>
                    </a>
                </li><li class="block"></li>
                <li class="kakaoStory"><a href="http://pf.kakao.com/_KxfZDI" target="_blank" title="삼성전자 뉴스룸 카카오스토리">
                        <div class="svg_icon">
                            <img src="https://img.global.news.samsung.com/image/icon_svg/ico_kakaostory_wh.svg" alt="">
                        </div>
                    </a>
                </li>
                <li>
                    <a href="https://news.samsung.com/medialibrary/kr" target="_blank" title="국문 미디어라이브러리">
                        <div class="svg_icon">
                            <img src="https://img.global.news.samsung.com/image/icon_svg/ico_media_wh.svg" alt="">
                        </div>
                    </a>
                </li>
                <li><a href="https://news.samsung.com/kr/feed/rss" target="_blank" title="삼성전자 뉴스룸 RSS">
                        <div class="svg_icon">
                            <img src="https://img.global.news.samsung.com/image/icon_svg/ico_rss_wh.svg" alt="">
                        </div>
                    </a>
                </li>
                <li><a href="https://news.google.com/publications/CAAiEKwIgEjNlufqMF7PAIAQah0qFAgKIhCsCIBIzZbn6jBezwCAEGod" target="_blank" title="삼성전자 구글 뉴스">
                        <div class="svg_icon">
                            <img src="https://img.global.news.samsung.com/image/icon_svg/ico_googlenews_wh.svg" alt="">
                        </div>
                    </a>
                </li>
            </ul>
            <a href="http://webwatch.or.kr/Situation/WA_Situation.html?MenuCD=110" class="web_accessibility" title="새 창으로 열기" target="_blank">
                <img src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/images/WA_Mark_2025.svg" title="WA 품질인증 마크, 웹와치(WebWatch) 2024.12.4 ~ 2025.12.3" alt="과학기술정보통신부 WA(WEB접근성) 품질인증 마크, 웹와치(WebWatch) 2024.12.4 ~ 2025.12.3">
            </a>
            <div class="select_wrap noborder">
                <div class="custom_select">
                    <button type="button" title="패밀리 사이트 링크 목록 열기">패밀리 사이트</button>
                    <div class="list">
                        <p><a href="https://www.samsung.com/sec/" target="_blank" title="새 창으로 열기">SAMSUNG.COM</a></p>
                        <p><a href="http://csr.samsung.com/ko/main.do" target="_blank" title="새 창으로 열기">삼성전자 사회공헌</a></p>
                        <p><a href="https://www.samsung.com/sec/sustainability/main/" target="_blank" title="새 창으로 열기">삼성전자 지속가능경영</a></p>
                        <p><a href="https://news.samsungsemiconductor.com/" target="_blank" title="새 창으로 열기">삼성전자 반도체 뉴스룸</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- //#footer -->


<div id="sitemap">
    <div class="sitemap_wrap">
        <div class="sitemap_inner">
            <div class="sitemap_size">
                <p>사이트맵</p>
                <div class="ul_wrap">
                    <ul id="menu-gnb180625-1" class="main-menu"><li class="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor current-menu-parent current-post-parent menu-item-has-children menu-item-376920 active"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85">기업뉴스</a>
<ul class="sub-menu">
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376921 active"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85/%ea%b8%b0%ec%97%85%eb%ac%b8%ed%99%94">기업문화</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376922"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85/%ea%b8%b0%ec%88%a0">기술</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376923"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85/%eb%94%94%ec%9e%90%ec%9d%b8">디자인</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-441857"><a href="https://news.samsung.com/kr/category/%ea%b8%b0%ec%97%85/%ea%b2%bd%ec%98%81%ec%9d%bc%eb%b0%98">경영일반</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-376928"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88">제품뉴스</a>
<ul class="sub-menu">
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376929 active"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%eb%aa%a8%eb%b0%94%ec%9d%bc">모바일</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376930"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%ec%8a%a4%eb%a7%88%ed%8a%b8tv">TV/디스플레이</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376931"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%ea%b0%80%ec%a0%84">가전</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376933"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%eb%b0%98%eb%8f%84%ec%b2%b4ssd">반도체</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376934"><a href="https://news.samsung.com/kr/category/%ec%a0%9c%ed%92%88/%ea%b8%b0%ed%83%80">더 많은 제품</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor menu-item-has-children menu-item-441858"><a href="https://news.samsung.com/kr/category/%eb%af%b8%eb%9e%98%eb%8f%99%ed%96%89">미래동행</a>
<ul class="sub-menu">
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor current-menu-parent current-post-parent menu-item-441859 active"><a href="https://news.samsung.com/kr/category/%eb%af%b8%eb%9e%98%eb%8f%99%ed%96%89/%ec%82%ac%ed%9a%8c%ea%b3%b5%ed%97%8c">사회공헌</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-441860"><a href="https://news.samsung.com/kr/category/%eb%af%b8%eb%9e%98%eb%8f%99%ed%96%89/%ec%b9%9c%ed%99%98%ea%b2%bd">친환경</a></li>
	<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-441861"><a target="_blank" href="https://www.samsung.com/sec/sustainability/main/">지속가능경영</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-376941"><a href="https://news.samsung.com/kr/category/%ed%94%84%eb%a0%88%ec%8a%a4%ec%84%bc%ed%84%b0">프레스센터</a>
<ul class="sub-menu">
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376945 active"><a href="https://news.samsung.com/kr/category/%ed%94%84%eb%a0%88%ec%8a%a4%ec%84%bc%ed%84%b0/%eb%b3%b4%eb%8f%84%ec%9e%90%eb%a3%8c">보도자료</a></li>
	<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-384944"><a target="_blank" href="https://news.samsung.com/medialibrary/kr">미디어 라이브러리</a></li>
	<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-376942"><a href="https://news.samsung.com/kr/category/%ed%94%84%eb%a0%88%ec%8a%a4%ec%84%bc%ed%84%b0/%ec%9d%b4%ec%8a%88%ec%99%80-%ed%8c%a9%ed%8a%b8">이슈와 팩트</a></li>
	<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-379621"><a href="https://news.samsung.com/kr/fast-facts">회사소개(Fast-Facts)</a></li>
</ul>
</li>
</ul>                </div>
                <button class="btn_sitemap_close" type="button">사이트맵 레이어 닫기</button>
            </div>
        </div>
    </div>
</div>

<!-- Button : TOP -->
<a href="#wrapper" id="btn_top" title="맨 위로" style="">TOP</a>
</div><!-- //#wrapper -->

<div class="overlay"></div>

<script type="text/javascript">
    function searchSubmit(option) {
        // 날짜
        var rd_index = jQuery(".top_search .search_option1").find("ul").children(".on").index();
        switch ( rd_index ) {
            case 5: jQuery("#rd").val( get_regDate_( 5, '.top_search .search_option1' ) ); break;
            case -1: break; // 아무것도 선택 안함 == 기본값
            default: jQuery("#rd").val( rd_index ); //옵션값 바꿨을 때에 #rd값 변경
        }
        // 정렬
        switch ( jQuery(".top_search .search_option2").find("ul").children(".on").index() ) {
            // case 2 : jQuery("#st").val("r"); break;
            case 2 : jQuery("#st").val("p"); break;
            default : jQuery("#st").val("d"); break;
        }
        // 카테고리
        switch ( jQuery(".top_search .search_option3").find("ul").children(".on").index() ) {
            case 2 : jQuery("#ct").val("articles"); break;
            case 3 : jQuery("#ct").val("press-release"); break;
            default : jQuery("#ct").val("all"); break;
        }
    }

    (function($) {
        //검색창에 빈값 입력시
        $("#searchform").submit(function() {
            var query = $("#query").val();
            if ( $.trim(query) == "" ) {
                window.alert("검색어를 입력하세요.");
                return false;
            }
        });
    })(jQuery);

    // 뷰저블 스크립트
    (function(w, d, a){
        w.__beusablerumclient__ = {
            load : function(src){
                var b = d.createElement("script");
                b.src = src; b.async=true; b.type = "text/javascript";
                d.getElementsByTagName("head")[0].appendChild(b);
            }
        };w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
    })(window, document, "//rum.beusable.net/load/b221216e175435u260");

</script>



<!-- //이미지 줌인, 줌아웃 html 추가 -->
<div class="zoom_layer" style="height: 600px; margin-top: -300px; display: none;">
	<div class="zoom_layer_inner">
		<div class="img_box dragscroll">
			<img src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/images/default_image.png" alt="" class="draggable" style="">
		</div>
		<button type="button" class="btn_in">image Zoom-in</button>
		<button type="button" class="btn_out">image Zoom-out</button>
		<button type="button" class="btn_close">close</button>
	</div>
</div>
        <script type="text/javascript">
            var post_data = {
                'action' : 'post_view_counter',
                'post_uri': location.href
            };
            jQuery.post("https://news.samsung.com/kr/wp-admin/admin-ajax.php", post_data,  function(response){
                
            });
        </script>
        <script type="text/javascript" src="https://news.samsung.com/kr/wp-content/plugins/btr_image_controller/js/dragscroll.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript">
/* <![CDATA[ */
var btr_image_controller = {"default_image_url":"https:\/\/news.samsung.com\/kr\/wp-content\/themes\/btr_newsroom\/images\/default_image.png"};
/* ]]> */
</script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/plugins/btr_image_controller/js/btr-image-controller.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-includes/js/wp-embed.min.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/jquery-ui.min.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/jquery.dotdotdot.min.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/jquery.browser.mobile.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/jquery.scrollbar.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/jquery.touchSwipe.min.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/jquery.btr.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/jquery.btr.slide.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/clipboard.min.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/copy2clipboard.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/swiper-bundle.min.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/slick.min.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/common.script.js?ver=1.1.9"></script>
<script type="text/javascript">
/* <![CDATA[ */
var BtrSearch = {"advancedSearch":"\uc0c1\uc138\uac80\uc0c9","hide":"\uc228\uae40","day":"\ub0a0\uc9dc\ubcc4","anyTime":"\uc804\uccb4 \ub0a0\uc9dc","pastWeek":"1\uc8fc\uc77c\uc804","pastMonth":"1\uac1c\uc6d4\uc804","pastYear":"1\ub144\uc804","customRange":"\uae30\uac04\uc124\uc815","sortBy":"\uc815\ub82c\ubc29\uc2dd","recent":"\ucd5c\uc2e0\uc21c","popular":"\uc778\uae30\uc21c","contentType":"\ubd84\ub958\ubcc4","all":"\uc804\uccb4","article":"\uae30\ud68d\uae30\uc0ac","pressRelease":"\ubcf4\ub3c4\uc790\ub8cc"};
/* ]]> */
</script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/search.script.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>
<script type="text/javascript" src="https://news.samsung.com/kr/wp-content/themes/btr_newsroom/js/content.script.js?ver=569f46f5840bad8a0b22e4a24255c14e"></script>

	<!-- start miniAudioPlayer initializer -->
	<script type="text/javascript">

	var miniAudioPlayer_replaceDefault = false;
	var miniAudioPlayer_excluded = "map_excluded";
	var miniAudioPlayer_replaceDefault_show_title = false;

	var miniAudioPlayer_defaults = {
				inLine:true,
                width:"350",
				skin:"black",
				animate:true,
				volume:.5,
				autoplay:false,
				showVolumeLevel:true,
				allowMute: true,
				showTime:true,
				id3:false,
				showRew:true,
				addShadow: false,
				downloadable:false,
				downloadPage:null,
				swfPath:"https://news.samsung.com/kr/wp-content/plugins/wp-miniaudioplayer/js/",
				onReady: function(player, $controlsBox){
				   if(player.opt.downloadable && player.opt.downloadablesecurity && !false){
				        jQuery(".map_download", $controlsBox).remove();
				   }
				}
		};

    function initializeMiniAudioPlayer(){
         jQuery(".mejs-container a").addClass(miniAudioPlayer_excluded);
         jQuery("a[href*='.mp3'] ,a[href*='.m4a']").not(".map_excluded").not(".wp-playlist-caption").mb_miniPlayer(miniAudioPlayer_defaults);
    }

    if(false)
        jQuery("body").addClass("map_replaceDefault");

	jQuery(function(){
      if(false){
         setTimeout(function(){replaceDefault();},0);
      }
      initializeMiniAudioPlayer();
      jQuery(document).ajaxSuccess(function(event, xhr, settings) {
        initializeMiniAudioPlayer();
      });
	});
	</script>
	<!-- end miniAudioPlayer initializer -->

	

<div id="ui-datepicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div><div id="tooltip" style="visibility: hidden; opacity: 0; position: absolute; padding: 5px; background-color: rgb(255, 255, 255); border-radius: 5px; font-size: 14px; z-index: 1000; box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 8px; display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 8px;"><button style="width: 25px; height: 25px; border-radius: 50%; border: none; cursor: pointer; background-color: rgb(255, 255, 131);"></button><button style="width: 25px; height: 25px; border-radius: 50%; border: none; cursor: pointer; background-color: rgb(166, 255, 233);"></button><button style="width: 25px; height: 25px; border-radius: 50%; border: none; cursor: pointer; background-color: rgb(255, 199, 186);"></button><button style="width: 25px; height: 25px; border-radius: 50%; background-color: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;"><span style="display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 25px; height: 25px;">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-2 14H7L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <rect x="9" y="2" width="6" height="4" rx="1" ry="1"></rect>
      </svg>
    </span></button><button style="width: 25px; height: 25px; border-radius: 50%; background-color: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;"><span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px;">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20.000000pt" height="20pt" viewBox="300 300 700.000000 700.000000" preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
<path d="M6265 9803 c-145 -52 -247 -158 -291 -302 -11 -38 -14 -267 -14 -1399 0 -1337 0 -1353 20 -1413 24 -69 38 -95 92 -160 21 -26 38 -52 38 -57 0 -19 113 -104 177 -133 146 -67 322 -55 446 30 101 69 173 182 196 306 8 40 11 460 11 1354 0 1434 3 1360 -65 1491 -20 36 -59 88 -87 116 -29 27 -45 40 -37 29 7 -11 -8 2 -36 28 -27 26 -83 65 -124 85 -68 34 -82 37 -175 40 -77 2 -113 -2 -151 -15z"></path>
<path d="M5005 9526 c-1015 -446 -1757 -1381 -1969 -2481 -76 -394 -78 -863 -6 -1262 68 -373 216 -776 403 -1098 22 -38 40 -75 40 -82 0 -7 3 -10 7 -8 3 2 15 -10 25 -27 13 -22 14 -29 4 -24 -8 4 -3 -2 11 -14 14 -12 19 -19 12 -15 -11 6 -12 3 -4 -11 13 -23 47 -65 36 -45 -4 9 -3 12 4 7 6 -4 9 -13 6 -20 -3 -7 3 -19 12 -27 15 -12 17 -12 9 0 -5 9 -4 12 3 7 6 -4 9 -13 6 -20 -3 -8 0 -17 7 -22 8 -5 10 -3 4 7 -5 8 -4 11 1 6 5 -5 9 -16 9 -25 0 -9 5 -17 12 -17 6 0 15 -4 20 -9 5 -5 3 -6 -4 -2 -7 4 -13 3 -13 -2 0 -15 26 -33 35 -24 5 4 5 1 1 -6 -15 -26 265 -348 442 -509 545 -493 1165 -788 1880 -894 177 -26 590 -37 782 -20 823 73 1580 430 2157 1018 559 568 899 1303 974 2106 17 185 6 612 -20 787 -116 778 -450 1442 -1000 1990 -169 167 -383 346 -403 334 -7 -4 -10 -4 -6 1 4 4 3 14 -3 22 -14 16 -33 18 -23 1 4 -7 3 -8 -5 -4 -6 4 -9 11 -6 16 6 10 -43 43 -54 36 -5 -3 -15 2 -22 12 -12 15 -12 16 1 7 9 -5 6 -1 -7 10 -31 28 -88 61 -78 46 5 -9 2 -9 -13 0 -12 7 -18 17 -16 21 3 5 2 8 -3 7 -21 -4 -34 2 -27 13 4 7 3 8 -4 4 -15 -9 -55 18 -44 29 4 5 2 5 -5 1 -6 -3 -35 8 -64 25 -107 63 -417 209 -444 209 -3 0 -5 -219 -5 -487 l0 -488 45 -28 c25 -16 43 -33 40 -37 -10 -16 50 -73 182 -172 236 -176 456 -405 603 -628 34 -52 66 -94 71 -93 4 2 5 -5 2 -14 -4 -11 -3 -14 5 -9 7 4 10 2 7 -6 -3 -7 9 -35 25 -63 16 -27 30 -45 30 -40 0 6 5 2 11 -8 5 -9 7 -22 3 -29 -4 -6 -3 -8 4 -4 13 8 26 -29 16 -45 -4 -7 -3 -9 3 -6 11 7 22 -13 60 -113 254 -664 221 -1404 -92 -2031 -127 -255 -258 -439 -454 -642 -389 -401 -868 -652 -1419 -742 -440 -72 -911 -20 -1333 146 -71 28 -126 55 -123 60 3 5 -3 6 -12 2 -13 -5 -15 -3 -9 7 5 8 4 11 -3 7 -13 -9 -44 2 -37 13 3 4 -2 11 -11 14 -8 3 -12 2 -9 -4 3 -6 -1 -7 -9 -4 -9 3 -14 9 -11 14 7 11 -93 62 -107 54 -6 -4 -8 -3 -5 3 4 6 -30 33 -74 62 -183 120 -405 321 -543 492 -275 343 -449 736 -523 1184 -26 158 -26 593 0 750 110 666 441 1221 969 1627 194 148 221 172 241 205 29 50 39 193 35 527 -3 275 -5 315 -21 347 -20 39 -62 67 -71 46 -2 -7 -5 21 -5 61 -1 39 -4 72 -8 72 -5 -1 -62 -25 -128 -54z m3645 -1956 c6 -11 8 -20 6 -20 -3 0 -10 9 -16 20 -6 11 -8 20 -6 20 3 0 10 -9 16 -20z m-3425 -3410 c3 -6 -1 -7 -9 -4 -18 7 -21 14 -7 14 6 0 13 -4 16 -10z"></path>
</g>
</svg>
  </span></button></div></body>

`

module.exports = { mockHtml };