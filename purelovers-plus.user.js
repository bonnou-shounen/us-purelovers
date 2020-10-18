// ==UserScript==
// @name        purelovers-plus
// @version     v0.0.8
// @match       https://www.purelovers.com/*
// ==/UserScript==

(function() {
    'use strict';

    // オフィシャルフラグを削除する
    if (location.search.match(/\bofficial=1\b/)) {
        location.search = location.search.replace(/\bofficial=1\b/, '')
        return
    }

    // 出勤情報のリンクを作る
    const anchors = document.getElementsByClassName('pureHeader_btn')
    if (anchors.length > 0) {
        const divsroot = anchors[0].parentNode.parentNode
        const schediv = document.createElement('div')
        divsroot.insertBefore(schediv, divsroot.children[1])
        schediv.outerHTML = '<div class="pureHeader_col"><a href="https://www.purelovers.com/user/favorite-girl-schedule/" class="pureHeader_btn"><i class="pureHeader_btn-icon zmdi zmdi-account-calendar" style="font-size: 20px"></i><span class="pureHeader_btn-text">出勤情報</span></a></div>'
    }

    // 店名をオフィシャルサイトへのリンクにする
    const sn = document.getElementById('shopName')
    if (sn) {
        const table = {
            568: 'https://www.seyten.com/schedule/',
            1049: 'https://www.violence.jp/schedule.html',
            1050: 'https://www.club-heart.jp/schedule.html',
            1271: 'https://www.oideyasueden2.com/schedule/',
            1801: 'https://tokyo.happiness-group.com/schedule.html',
            5027: 'https://www.happiness-dream.com/happiness/schedule.html',
            8754: 'http://www.yuki-soapland.com/companion/schedule.php',
            9754: 'https://yoshiwara.happiness-group.com/schedule.html',
            10238: 'https://www.cityheaven.net/tokyo/A1317/A131703/b-otome/attend/',
            13081: 'https://www.clubheart-dx.jp/schedule.html',
        }
        const os = table[location.pathname.match(/\/shop\/(\d+)/)[1] - 0]
        if (os) {
            sn.outerHTML = '<a href="' + os + '" target="_blank" style="text-decoration: none; border-bottom: solid 1px #FF0066;">' + sn.outerHTML + '</a>'
        }
    }

   // メール中のURIをリンクにする
   const mails = document.getElementsByClassName('mailLetter')
   if (mails.length > 0) {
       mails[0].innerHTML = mails[0].innerHTML.replace(/https:\/\/[-a-z0-9./]+/g, '<a href="$&">$&</a>')
   }
})()
