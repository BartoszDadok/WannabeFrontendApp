import { render } from "../../../utils/test-utils";
import BackCard from "../../../components/organims/BackCard";

const data = [
  [
    [
      {
        html: "<h1>What is the difference between <strong>==</strong> and <strong>===</strong>?</h1>\n",
      },
    ],
    [
      {
        html: "<h1>Function <strong>setTimeout()</strong> - runs the code/function once after the timeout expressed in ms.</h1>\n",
      },
      {
        html: '<pre class="hljs"><code><span class="hljs-built_in">setTimeout</span>(<span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) {\n <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Done after one second&quot;</span>);\n}, <span class="hljs-number">1000</span>)\n</code></pre>',
      },
      {
        html: "\n<h1>Function <strong>setInterval()</strong> - runs the code/function repeatedly with a fixed time delay between each call. This method returns an interval ID, so you can remove it later by calling <strong>clearInterval()</strong>.</h1>\n",
      },
      {
        html: '<pre class="hljs scroll"><code><span class="hljs-keyword">const</span> intervalID = <span class="hljs-built_in">setInterval</span>(<span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) {\n <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Done every second...&quot;</span>);\n}, <span class="hljs-number">1000</span>)\n\n<span class="hljs-comment">// clearInterval(intervalID); // Removing</span>\n</code></pre>',
      },
      {
        html: "\n",
      },
    ],
    [
      {
        html: "<h1>What will be the result of this code?</h1>\n",
      },
      {
        html: '<pre class="hljs"><code><span class="hljs-keyword">const</span> angular1 = <span class="hljs-title class_">Symbol</span>(<span class="hljs-string">&quot;Angular&quot;</span>);\n<span class="hljs-keyword">const</span> angular2 = <span class="hljs-title class_">Symbol</span>(<span class="hljs-string">&quot;Angular&quot;</span>);\n\n<span class="hljs-keyword">const</span> react1 = <span class="hljs-title class_">Symbol</span>.<span class="hljs-title function_">for</span>(<span class="hljs-string">&quot;React&quot;</span>);\n<span class="hljs-keyword">const</span> react2 = <span class="hljs-title class_">Symbol</span>.<span class="hljs-title function_">for</span>(<span class="hljs-string">&quot;React&quot;</span>);\n\n<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(angular1 === angular2);\n<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(react1 === react2);\n</code></pre>',
      },
      {
        html: "\n",
      },
    ],
    [
      {
        html: "",
      },
      {
        html: '<pre class="hljs"><code><span class="hljs-keyword">const</span> angular1 = <span class="hljs-title class_">Symbol</span>(<span class="hljs-string">&quot;Angular&quot;</span>);\n<span class="hljs-keyword">const</span> angular2 = <span class="hljs-title class_">Symbol</span>(<span class="hljs-string">&quot;Angular&quot;</span>);\n\n<span class="hljs-keyword">const</span> react1 = <span class="hljs-title class_">Symbol</span>.<span class="hljs-title function_">for</span>(<span class="hljs-string">&quot;React&quot;</span>);\n<span class="hljs-keyword">const</span> react2 = <span class="hljs-title class_">Symbol</span>.<span class="hljs-title function_">for</span>(<span class="hljs-string">&quot;React&quot;</span>);\n\n<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(angular1 === angular2); <span class="hljs-comment">// Output: false</span>\n<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(react1 === react2); <span class="hljs-comment">// Output: true</span>\n</code></pre>',
      },
      {
        html: "\n<h1>Each symbol created with <strong>Symbol()</strong> is a unique value, regardless of the argument passed.</h1>\n<h1>In contrast to <strong>Symbol()</strong>, the <strong>Symbol.for()</strong> function creates a symbol available in a global symbol registry list. <strong>Symbol.for()</strong> does also not necessarily create a new unique symbol on every call, but checks first if a symbol with the given key is already present in the registry. If no symbol with the given key is found, <strong>Symbol.for()</strong> will create a new global symbol.</h1>\n",
      },
    ],
  ],
];

describe("Back Card", () => {
  test("Should render Back Card", () => {
    const { getByText } = render(<BackCard />, {
      preloadedState: {
        flashcard: {
          flashcardsData: data,
          flashcardNumber: 0,
          activeCardSide: "front",
        },
      },
    });
    expect(getByText(/What is the difference between/i)).toBeTruthy();
    expect(getByText(/This method returns an interval ID/i)).toBeTruthy();
    expect(getByText("Next question")).toBeTruthy();
  });
});
