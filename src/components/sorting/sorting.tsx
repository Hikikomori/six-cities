import {connect} from "react-redux";

import {ActionCreator as baseAction, Operation as baseOperation} from "../../reducer/base/base";

const {toggleSortingFlag} = baseAction;

const {setSorting} = baseOperation;

interface Props {
  options: Array<string>,
  active: string,
  setSorting: (sorting: string) => void,
  isSortingOpened: boolean,
  toggleSortingFlag: () => void
}

const Sorting: React.FC<Props> = (props) => {
  const {
    options,
    active,
    setSorting,
    isSortingOpened,
    toggleSortingFlag} = props;

  return <div className="places__sorting">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex={0} onClick={toggleSortingFlag}>
                  &nbsp;{active}
      <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
    <ul className={`${isSortingOpened ? `places__options--opened` : ``} places__options places__options--custom`}>
      {options.map((option, i) => {
        return <li className={`${active === option ? `places__option--active` : ``} places__option`} onClick={() => setSorting(option)} tabIndex={0} key={i}>{option}</li>
      })}
    </ul>
  </div>
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  options: state.BASE.sortingOptions,
  active: state.BASE.sorting,
  isSortingOpened: state.BASE.isSortingOpened,
});

const mapDispatchToProps = {
  setSorting,
  toggleSortingFlag,
};

export {Sorting};

export default connect(mapStateToProps, mapDispatchToProps)(Sorting)
