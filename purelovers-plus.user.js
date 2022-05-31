// ==UserScript==
// @name        purelovers-plus
// @version     0.1.1
// @match       https://purelovers.com/*
// ==/UserScript==

(function() {
    'use strict';

    // オフィシャルフラグを削除する
    if (location.search.match(/\bofficial=1\b/)) {
        location.search = location.search.replace(/\bofficial=1\b/, '')
        return
    }

    // 出勤情報のリンクを作る
    const divsroot = document.querySelector('.k_header-body div.k_row-grid--xsmall')
    if (divsroot) {
        const schediv = divsroot.children[0].cloneNode(true)
        const anchor = schediv.querySelector('a')
        anchor.setAttribute('href', 'https://purelovers.com/user/favorite-girl-schedule/')
        anchor.innerHTML = anchor.innerHTML.replace('キープ', '出勤情報')
        divsroot.insertBefore(schediv, divsroot.children[1])
    }

    // 店名をオフィシャルサイトへのリンクにする
    const sn = document.querySelector('.k_globalInforShop h1')
    if (sn) {
        const table = {
            568: 'https://www.seyten.com/schedule/',
            1049: 'https://www.violence.jp/schedule.html',
            1050: 'https://www.club-heart.jp/schedule.html',
            1271: 'https://www.oideyasueden2.com/schedule/',
            1801: 'https://tokyo.happiness-group.com/schedule.html',
            3734: 'https://fukuoka.happiness-group.com/schedule.html',
            5027: 'https://www.happiness-dream.com/happiness/schedule.html',
            8754: 'http://www.yuki-soapland.com/companion/schedule.php',
            9754: 'https://yoshiwara.happiness-group.com/schedule.html',
            10238: 'https://www.cityheaven.net/tokyo/A1317/A131703/b-otome/attend/',
            12499: 'https://www.dream-fukuoka.com/schedule.html',
            13081: 'https://www.clubheart-dx.jp/schedule.html',
            18040: 'https://sapporo.happiness-group.com/schedule.html',
        }
        const os = table[location.pathname.match(/\/shop\/(\d+)/)[1] - 0]
        if (os) {
            sn.innerHTML = '<a href="' + os + '" target="_blank" class="k_pink--text k_text-hover--blue-accent-4">' + sn.innerHTML + '</a>'
        }
    }

    // メール中のURIをリンクにする
    if (location.pathname.match(/\/mail-receive-detail\//)) {
        const mb = document.querySelector('p.k_mt-4')
        if (mb) {
            mb.innerHTML = mb.innerHTML.replace(/https:\/\/[-a-z0-9./]+/g, '<a href="$&" class="k_pink--text k_text-hover--blue-accent-4">$&</a>')
        }
    }
})()
