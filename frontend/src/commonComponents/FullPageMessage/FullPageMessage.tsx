import './FullPageMessage.css';

type Props = {
  title: string
  renderSubtitle: (highlightedTextCN: string) => JSX.Element
};

const subtitleHighlightedClassName = 'FullPageMessage__text_highlighted';

export const FullPageMessage = ({ title, renderSubtitle }: Props) => (
  <div className="FullPageMessage">
    <h1>{title}</h1>
    {renderSubtitle(subtitleHighlightedClassName)}
  </div>
);
