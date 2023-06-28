import { render, screen } from "../../../utils/test-utils";
import FrontCardQuestion from "../../../components/atoms/FrontCardQuestion";
const frontCard = [
  {
    html: "<h1>What is the difference between <strong>setTimeout()</strong> and <strong>setInterval()<strong>?</h1>",
  },
];
const frontCardWithCode = [
  { html: "<h1>What will be the result of this code?</h1>" },
  {
    html: '<pre class="hljs"><code><span class="hljs-keyword">const</span> angular1 = <span class="hljs-title class_">Symbol</span (<span class="hljs-string">&quot;Angular&quot;</span>); <span class="hljs-keyword">const</span> angular2 = <span class="hljs-title class_">Symbol</span>(<span class="hljs-string">&quot;Angular&quot;</span>); <span class="hljs-keyword">const</span> react1 = <span class="hljs-title class_">Symbol</span>.<span class="hljs-title function_">for</span>(<span class="hljs-string">&quot;React&quot;</span>); <span class="hljs-keyword">const</span> react2 = <span class="hljs-title class_">Symbol</span>.<span class="hljs-title function_">for</span>(<span class="hljs-string">&quot;React&quot;</span>); <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(angular1 === angular2); <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(react1 === react2); </code></pre>',
  },
  { html: "" },
];
describe("FrontCardQuestion", () => {
  test("Should render front card question component", () => {
    const { getByText } = render(<FrontCardQuestion frontCard={frontCard} />);
    expect(getByText("What is the difference between")).toBeTruthy();
  });

  test("Should render front card with code block", () => {
    const { getByTestId } = render(
      <FrontCardQuestion frontCard={frontCardWithCode} />
    );
    const foundedElement = getByTestId("pre");
    expect(foundedElement).toBeTruthy();
  });

  test("Should render front card without code block", () => {
    const { queryByTestId } = render(
      <FrontCardQuestion frontCard={frontCard} />
    );
    expect(queryByTestId("pre")).toBeFalsy();
  });

  test("Should render code block with backgroundcolor: rgba(193,193,193,1) when theme is dark", () => {
    const { getAllByTestId } = render(
      <FrontCardQuestion frontCard={frontCardWithCode} />,
      {
        preloadedState: {
          theme: { mode: "dark" },
        },
      }
    );
    const foundedElement = getAllByTestId("pre");
    expect(foundedElement[0].props.style[0].backgroundColor).toEqual(
      "rgba(193,193,193,1)"
    );
  });

  test("Should render code block with backgroundcolor: rgba(233,233,233,1) when theme is light", () => {
    const { getAllByTestId } = render(
      <FrontCardQuestion frontCard={frontCardWithCode} />,
      {
        preloadedState: {
          theme: { mode: "light" },
        },
      }
    );
    const foundedElement = getAllByTestId("pre");
    expect(foundedElement[0].props.style[0].backgroundColor).toEqual(
      "rgba(233,233,233,1)"
    );
  });
});
