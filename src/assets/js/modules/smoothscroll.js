//
// smooth scroll ( sample )
//

MYEJSPROJECT.smoothScroll = {

  offsetY : -10, // スクロールのオフセット値
  time : 500, // スクロールにかかる時間

  init : function() {
    if($('a[href^="#"]').length) MYEJSPROJECT.smoothScroll.bind();
  },

  bind : function() {
    $('a[href^="#"]').click(function() {
      // 移動先となる要素を取得
      var target = $(this.hash);
      if (!target.length) return ;
      // 移動先となる値
      var targetY = target.offset().top+MYEJSPROJECT.smoothScroll.offsetY;
      // スクロールアニメーション
      $('html,body').animate({scrollTop: targetY}, MYEJSPROJECT.smoothScroll.time, 'easeOutQuad');
      // ハッシュ書き換えとく
      window.history.pushState(null, null, this.hash);
      // デフォルトの処理はキャンセル
      return false;
    });
  },

  // jsから直接してい用
  _smoothScroll : function(target) {
    if (!target.length) return ;
    var targetY = target.offset().top+MYEJSPROJECT.smoothScroll.offsetY;
    $('html,body').animate({scrollTop: targetY}, MYEJSPROJECT.smoothScroll.time, 'easeOutQuad');
    return false;
  },

}