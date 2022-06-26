// ==UserScript==
// @name        purelovers-plus
// @version     0.1.6
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
        document.querySelector('.k_header-body div.k_row').children[1].remove() // スペース確保
        const schediv = divsroot.children[1].cloneNode(true)
        const anchor = schediv.querySelector('a')
        anchor.setAttribute('href', 'https://purelovers.com/user/favorite-girl-schedule/')
        anchor.innerHTML = anchor.innerHTML.replace('キープ', '出勤情報')
        divsroot.insertBefore(schediv, divsroot.children[2])
    }

    // 可能ならオフィシャルサイトへのリンクをつける
    const sn = document.querySelector('.k_globalInforShop-body h1')
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
            sn.innerHTML = `${sn.innerHTML} &nbsp;/&nbsp;
              <a href="${os}" target="_blank" class="k_text k_grey--text k_text--darken-3 k_text--large k_text-dense k_text-height--default k_text-inline-block">
                 <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="18px" height="18px">
                   <path d="M 19.980469 2.9902344 A 1.0001 1.0001 0 0 0 19.869141 3 L 15 3 A 1.0001 1.0001 0 1 0 15 5 L 17.585938 5 L 8.2929688 14.292969 A 1.0001 1.0001 0 1 0 9.7070312 15.707031 L 19 6.4140625 L 19 9 A 1.0001 1.0001 0 1 0 21 9 L 21 4.1269531 A 1.0001 1.0001 0 0 0 19.980469 2.9902344 z M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 13 A 1.0001 1.0001 0 1 0 19 13 L 19 19 L 5 19 L 5 5 L 11 5 A 1.0001 1.0001 0 1 0 11 3 L 5 3 z"/>
                 </svg>
            </a>`
        }
    }

    // メール中のURIをリンクにする
    if (location.pathname.match(/\/mail-receive-detail\//)) {
        const mb = document.querySelector('p.k_mt-4')
        if (mb) {
            mb.innerHTML = mb.innerHTML.replace(/https:\/\/[-a-z0-9./]+/g, '<a href="$&" class="k_pink--text k_text-hover--blue-accent-4">$&</a>')
        }
    }

    // 前へ 一覧へ 次へ を jkl で
    const navitems = document.querySelectorAll('nav ul.k_list-grid--small span.k_text')
    if (navitems.length == 3) {
        document.addEventListener('keydown', function (e) {
            switch (e.which) {
                case 74:
                    navitems[0].click()
                    break
                case 75:
                    navitems[1].click()
                    break
                case 76:
                    navitems[2].click()
                    break
            }
        }, false);
    }
})()
