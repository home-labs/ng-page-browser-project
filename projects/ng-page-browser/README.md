<h1 id="ngpagebrowser">NgPageBrowser</h1>
<h2 id="requirements">Requirements</h2>
<blockquote>
<ul>
<li>@angular/common, @angular/core, @angular/forms and @angular/router 5 or higher;</li>
<li>rxjs 5 or higher.</li>
</ul>
</blockquote>
<h2 id="installing">Installing</h2>
<pre><code>$ npm i @actjs.on/ng-page-browser --save
</code></pre>
<h2 id="usage">Usage</h2>
<p>Include the module into <code>imports</code> metadata key of <code>NgModule</code> decorator in your application, importing <code>NgPageBrowserModule</code> from <code>@actjs.on/ng-page-browser</code>, like that.</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span> NgPageBrowserModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@actjs.on/ng-page-browser'</span><span class="token punctuation">;</span>

@<span class="token function">NgModule</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    imports<span class="token punctuation">:</span> <span class="token punctuation">[</span>
        NgPageBrowserModule
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre>
<h2 id="data-and-event-binding">Data and Event Binding</h2>
<pre class=" language-html"><code class="prism  language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>lib-page-browser</span>
  <span class="token attr-name">#pageBrowser</span>
  <span class="token attr-name">[labelTranslations]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{
    firstPage: <span class="token punctuation">'</span>First<span class="token punctuation">'</span>,
    previousPage: <span class="token punctuation">'</span>«<span class="token punctuation">'</span>,
    nextPage: <span class="token punctuation">'</span>»<span class="token punctuation">'</span>,
    lastPage: <span class="token punctuation">'</span>Last<span class="token punctuation">'</span>
  }<span class="token punctuation">"</span></span>
  <span class="token attr-name">[enablePageNumberInputBox]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>true || false<span class="token punctuation">"</span></span>
  <span class="token attr-name">[queryParamPropertyName]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token punctuation">'</span>page<span class="token punctuation">'</span><span class="token punctuation">"</span></span>
  <span class="token attr-name">(changePage)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>onChangePage($event)<span class="token punctuation">"</span></span>
<span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>lib-page-browser</span><span class="token punctuation">&gt;</span></span>
</code></pre>
<p>So…</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span>
    Component<span class="token punctuation">,</span>
    OnInit<span class="token punctuation">,</span>
    ViewChild
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> PageBrowserComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@actjs.on/ng-page-browser'</span><span class="token punctuation">;</span>


@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    selector<span class="token punctuation">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
    templateUrl<span class="token punctuation">:</span> <span class="token string">'./app.component.html'</span><span class="token punctuation">,</span>
    styleUrls<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'./app.component.styl'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>

    @<span class="token function">ViewChild</span><span class="token punctuation">(</span><span class="token string">'pageBrowser'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token keyword">static</span><span class="token punctuation">:</span> <span class="token keyword">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">private</span> pageBrowser<span class="token punctuation">:</span> PageBrowserComponent<span class="token punctuation">;</span>

    enablePageNumberInputBox<span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>

    collection<span class="token punctuation">:</span> object<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    pageNumber<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">;</span>

    limit<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">;</span>

    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>enablePageNumberInputBox <span class="token operator">=</span> <span class="token keyword">true</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>collection <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pageNumber <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>limit <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span>
            interval <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>pageBrowser<span class="token punctuation">.</span>totalPages <span class="token operator">=</span> <span class="token number">1110</span><span class="token punctuation">;</span>
                    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pageBrowser<span class="token punctuation">.</span>totalPages <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>limit<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span>collection<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                            property1<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`property1 value </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span>
                            <span class="token punctuation">,</span> property2<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`property2 value </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'function called after an interval'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token function">clearInterval</span><span class="token punctuation">(</span>interval<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token function">onChangePage</span><span class="token punctuation">(</span>pageNumber<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pageNumber <span class="token operator">=</span> pageNumber<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre>
<p><strong>Note.</strong>:</p>
<blockquote>
<ul>
<li>don’t use this component nested a HTML tag block with <code>*ngIf</code> directive if you is using an <code>Angular</code> last than 8 version, or it’ll not work;</li>
<li><code>enablePageNumberInputBox</code> is optional, if you set it, you’ll can browse to a specific page, just clicking on the page number box to enable the page number input box (text input type) and clicking in previous page button (if the page number is smaller than current) or next page button (if the page number is bigger than current). If you enable the page number input box you can set <code>widthGrowthToggleFactor</code> to define the width growth factor of the page number input box;</li>
<li>You can use the <code>getPagePer</code> pipe passing the page number and the limit to page inline a collection <code>(... | getPagePer:pageNumberVariable:limitVariable)</code>.</li>
</ul>
</blockquote>

