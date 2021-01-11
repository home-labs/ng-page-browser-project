<h1 id="ngmatcheck">NgMatcheck</h1>
<h2 id="requirements">Requirements</h2>
<blockquote>
<ul>
<li>@angular/common, @angular/core, @angular/cdk, @angular/material, and @angular/forms 5 or higher;</li>
<li>@actjs.on/ng-cool-filter-pipe 1 or higher.</li>
</ul>
</blockquote>
<h2 id="installing">Installing</h2>
<pre><code>$ npm i @actjs.on/ng-matcheck --save
</code></pre>
<h2 id="api-reference">API reference</h2>
<h3 id="usage">Usage</h3>
<p>Include the module into <code>imports</code> metadata key of <code>NgModule</code> decorator in your application, importing <code>NgMatcheckModule</code> from <code>@actjs.on/ng-matcheck</code>, like that.</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span> NgMatcheckModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@actjs.on/ng-matcheck'</span><span class="token punctuation">;</span>

@<span class="token function">NgModule</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    imports<span class="token punctuation">:</span> <span class="token punctuation">[</span>
        NgMatcheckModule
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre>
<h3 id="directives">Directives</h3>
<p>Selector: <code>lib-mat-checkbox-group</code><br>
Exported as:  <code>NgMatcheck.MatCheckboxGroupComponent</code></p>
<h4 id="properties">Properties</h4>

<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>@Input()<br>objectCollection: object[]</td>
<td></td>
</tr>
<tr>
<td>@Input()<br>property: string</td>
<td>Property name of an object of the collection defined in <code>objectCollection</code>.</td>
</tr>
<tr>
<td>@Input()<br>formProperty: string</td>
<td>Optional, if it doesn’t defined it assumes the <code>property</code>.</td>
</tr>
<tr>
<td>@Input()<br>filterTerm: string</td>
<td>A term of string type to filter objects defined in <code>objectCollection</code>, by <code>propertyLabel</code>.</td>
</tr>
<tr>
<td>@Input() ngClass: any</td>
<td><a href="https://angular.io/api/common/NgClass">Angular NgClass Direcrive</a></td>
</tr>
<tr>
<td>@Input()<br>form: <a href="https://angular.io/api/forms/FormGroup">FormGroup</a> | <a href="https://angular.io/api/forms/NgForm">NgForm</a></td>
<td></td>
</tr>
<tr>
<td>@Input()<br>propertyLabel: string</td>
<td></td>
</tr>
<tr>
<td>@Input()<br>parent: <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypet">ThisType&lt;T&gt;</a></td>
<td></td>
</tr>
<tr>
<td>@Input()<br>callbackDeclarationOfDisabledProperty: ((matCheckbox: <a href="https://material.angular.io/components/checkbox/api#MatCheckbox">MatCheckbox</a>) =&gt; boolean)</td>
<td></td>
</tr>
</tbody>
</table>
