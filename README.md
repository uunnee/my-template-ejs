# my template ejs

- HTML / sass / js のサイトの制作効率化
- 静的サイトの多言語展開

```
$ npm install
$ gulp gas # gulpfileで指定したAPIたたいてjsonダウンロードして上書き保存する
$ gulp
   -> Server started http://localhost:8500
```

## ざっと説明

jsonで設定した情報を元に、ejsテンプレートを使って、言語展開したページを書き出します。

##### 設定ファイル

- project_settings
 - [pages.json](https://github.com/uunnee/my-template-ejs#project_settingspagesjson) : 書き出すページの設定 ( ページのpathやslugなど )
 - [languages.json](https://github.com/uunnee/my-template-ejs#project_settingslanguagesjson) : 書き出す言語の設定 ( 言語のpathやlabel、slugやlocaleなど )
- src
 - [ejs/_template.ejs](https://github.com/uunnee/my-template-ejs#srcejs_templateejs) : 細かい情報の設定。( サイトのURLや、app_idなどの設定もあるので要確認 )
 - language/ 以下 : 翻訳データ ( 各言語.json )

##### テンプレート

```_template.ejs```  でjsonから受け取った諸情報を整頓し、メインテンプレートを読み込みます。  
メインテンプレートは、```src/{pages.jsonで指定した"template"}.ejs``` か、未指定の場合は ```src/{ページpath}/{ページslug}.ejs``` ( 書き出し先と同じejs ) です。  

##### 翻訳

それぞれの言語の翻訳データを```$translation```として保持してます。  
~~テンプレート内で```<%- $translation.sample_text %>```と指定すると、```src/language/{言語slug}.json``` の```"sample_text"```の値をもってきます。~~  
  
翻訳データには、各ページの タイトル、ディスクリプション、キーワード も含まれます。  
pages.json で指定した各ページの```"meta_key"```の値を、~~各言語の~~翻訳データ内から参照します。  

**翻訳データは ./src/language/translation.json にまとめました。google spread sheet からの更新が可能です。**
(あとでまとめる)

##### 書き出し

書き出し先は、```dist/{言語path}/{ページpath}/{ページslug}.html```となります。

## 出力できる情報たち

##### サイトの情報 ( _template.ejsで指定 )

サイトのURL : ```<%- $site_url %>```  
サイトのパス : ```<%- $site_path %>```  
他にも_template.ejsにいろいろ設定してあります

##### 全ての言語の情報 ( languages.jsonで指定 )

```$langs``` ( 配列 )  
```
  <% 
  // slug : label の書き出し
  Object.keys($langs).forEach(function(key) { %>
     <%- key %> : <%- $langs[key] %>
  <% }); %>
```

##### 現在のページの情報

path : ```<%- $path %>``` ( pages.jsonで指定 )  
slug : ```<%- $slug %>``` ( pages.jsonで指定 )

##### 現在の言語の情報 ( languages.jsonで指定 )

path : ```<%- $path_lang %>```  
slug : ```<%- $lang %>```  
locale : ```<%- $locale %>``` ( en_US など )

##### 翻訳データ ( src/language/以下のjsonで指定 )

```$translation``` (jsonデータ)  
```<%- $translation.sampletext %>```  

##### ex. 言語リストで表示中の言語にカレントをつける

```
<ul>
<% Object.keys($langs).forEach(function(key) { 
  var is_current = "";
  var disp_key = key == 'ja' ? "" : key+"/";
  if(key == $lang) is_current = ' class="is-current"' %>
  <li<%- is_current %>><a href="<%- $site_path+disp_key %>"><%- $langs[key] %></a></li>
<% }); %>
</ul>
```

##### ex. ページで表示中のページにカレントをつける

```
<ul>
  <li<% if($slug=="index"&&$path==""){ %> class="is-current"<% } %>><a href="/<%- $lang_path %>">index.html</a></li>
  <li<% if($slug=="page1"&&$path==""){ %> class="is-current"<% } %>><a href="/<%- $lang_path %>page1.html">page1</a></li>
  <li<% if($slug=="index"&&$path=="sample/"){ %> class="is-current"<% } %>><a href="/<%- $lang_path %>sample/">sample/index.html</a></li>
  <li<% if($slug=="index2"&&$path=="sample/"){ %> class="is-current"<% } %>><a href="/<%- $lang_path %>sample/index2.html">sample/index2.html</a></li>
</ul>
```

##### ex. 自分の言語以外の言語リストを出力

```
<%
// alternate
// ( 現在の言語以外の言語のalternateタグを取得 )
$alternate = "";
Object.keys($langs).forEach(function(key) {
  if($lang!==key) $alternate = $alternate+ '<link rel="alternate" hreflang="'+key+'" href="'+$site_url+key+'/" />'+"\n";
});
%>
```

##### ex. 書き出しが /sample/index2.html の場合だけ出力

```
<% if($slug=="index2"&&$path=="sample/") { %>
  <p>これは /sample/index2.html ですが、page2のテンプレートを読んでいます。</p>
<% } %>
```

##### ex. 言語名のついた画像を出力

```
<p><img src="<%- $site_path %>assets/img/sampleimg/<%- $lang %>.png"></p>
```



## 構造

```
[my-template-ejs]
 ├ [dist] // 書き出しファイル
 ├ [project_settings]
 │ ├ languages.json // 展開する言語の定義
 │ └ pages.json // 展開するページの定義
 └ [src]
   ├ [assets]
   │ ├ [img] - ...
   │ ├ [js] - ...
   │ └ [sass] - ...
   ├ [ejs]
   │ ├ _template.ejs // ルートのテンプレート ( 必須 )
   │ └ index.ejs... // 各ejsテンプレート
   └ [language]
     └ en.json... // 各翻訳データ
```

##### project_settings/pages.json

```
{
  "pages": [
    {
      "path"           : "sample/", 
      "slug"           : "index",
      "template"       : "",
      "ogtype"         : "article",
      "meta_key"       : ""
    },
    {
      "path"           : "",
      ︙
    }
  ]
}
```

- pages
 - **path** : 書き出しページのpath。書き出し先が```/sample/index.html```なら```"sample/"```、ルート書き出しなら```""```指定
 - **slug** : 書き出しページのslug。```/sample/index.html```なら```"index"```
 - **template** : 書き出し先と同じejs以外を使う場合は、rc直下の```"{ejsのファイル名}"```を指定
 - **ogtype** : ページのog:type を指定
 - **meta_key** : 翻訳時のメタタグのキーを指定 ( 翻訳ファイルからこの値に対応するタイトル・ディスクリプション・キーワードをもってくる )

##### project_settings/languages.json

```
{
  "all_languages" : {
    "ja"   : "日本語",
    "en"   : "English",
    "fr"   : "Français",
    "zh-tw": "中文(繁體字)"
  },
  "languages": [
    {
      "lang"           : "ja",
      "path"           : "",
      "locale"         : "ja_JP"
    },
    {
      "lang"           : "en",
      "path"           : "en/",
      "locale"         : "en_US"
    },
    {
      "lang"           : "fr",
      ︙
    }
  ]
}
```

- all_languages
  - 言語のslug : 言語のlabel ( 展開する全ての言語を記載 )
- languages
 - **lang** : 言語のslug
 - **path** : 言語の書き出しpath。ルートに書き出すなら```""```
 - **locale** : 言語の細かいやつ ( SNSボタンとかにつかいそうな予感 )

##### src/ejs/_template.ejs

全ての書き出しページの共通設定情報が含まれます。(例：og imageや、app_id、サイトのURLなど)  
翻訳のデータを整理して、それぞれの場所に配置するための設定も含まれます。  
その情報を持って、それぞれのテンプレートを読み込みます。  

---

( たとえば、カテゴリテンプレートつくって、そのテンプレートでページ量産とかもできる。そのときはpages.jsonか該当ejsにもっと情報追加しないとだめだけど )
( 翻訳以外の利用もけっこうできそうな予感 )

