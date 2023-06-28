import BackCardQuestion from "../../../components/atoms/BackCardQuestion";
import { render } from "../../../utils/test-utils";
const backcard = [
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
];

describe("BackCardHeader", () => {
  test("Should render back-card content", () => {
    const { getByText } = render(<BackCardQuestion backCard={backcard} />);

    expect(
      getByText(
        "- runs the code/function once after the timeout expressed in ms."
      )
    ).toBeTruthy();
  });

  test("Should render back-card code block with scroll indicatior", () => {
    const { getAllByTestId } = render(<BackCardQuestion backCard={backcard} />);
    const foundedElements = getAllByTestId("ScrollContentContainer");
    expect(foundedElements[0].props.horizontal).toBeTruthy();
  });

  test("Should render back-card code block without scroll indicatior", () => {
    const { getAllByTestId } = render(<BackCardQuestion backCard={backcard} />);
    const foundedElements = getAllByTestId("WithoutScrollContentContainer");
    expect(foundedElements[0].props.horizontal).toBeFalsy();
  });

  test("Should render code block with backgroundcolor: rgba(193,193,193,1) when theme is dark", () => {
    const { getAllByTestId } = render(
      <BackCardQuestion backCard={backcard} />,
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
      <BackCardQuestion backCard={backcard} />,
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

// ,
