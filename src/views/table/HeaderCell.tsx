import { IAttributeState } from '../../types/IAttributeState';
import { ITableAttribute } from '../../types/ITableAttribute';
import { SortDirection } from '../../types/SortDirection';
import getAttr from '../../util/getAttr';

import { IconButton } from '../TooltipControls';

import SortIndicator from './SortIndicator';

import * as React from 'react';

export interface IHeaderProps {
  className: string;
  attribute: ITableAttribute;
  state: IAttributeState;
  doFilter: boolean;
  onSetSortDirection: (id: string, dir: SortDirection) => void;
  onSetFilter: (id?: string, filter?: any) => void;
  t: Function;
}

class HeaderCell extends React.Component<IHeaderProps, {}> {
  public render(): JSX.Element {
    const { t, attribute, className, doFilter } = this.props;
    return (
      <th className={`table-header-cell ${className}`} key={attribute.id}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='flex-rest' style={{ display: 'flex', flexDirection: 'row' }}>
            <p className='vcenter flex-rest'>{ t(attribute.name) }</p>
            <div style={{ margin: 'auto 5px auto auto', whiteSpace: 'nowrap' }}>
            { attribute.filter !== undefined ? this.renderFilterIndicator() : null }
            { attribute.isSortable ? this.renderSortIndicator() : null }
            </div>
          </div>
          { doFilter ? this.props.children : null }
        </div>
      </th>
    );
  }

  private renderSortIndicator(): JSX.Element {
    const { state } = this.props;

    const direction: SortDirection = getAttr(state, 'sortDirection', 'none') as SortDirection;

    return (
      <SortIndicator direction={ direction } onSetDirection={ this.setDirection }/>
    );
  }

  private renderFilterIndicator(): JSX.Element {
    const { t, attribute } = this.props;
    return (
      <IconButton
        id={`btn-filter-${attribute.id}`}
        className='btn-embed btn-table-filter'
        icon='filter'
        tooltip={t('Filter')}
        onClick={this.toggleFilter}
      />
    );
  }

  private setDirection = (dir: SortDirection) => {
    let { attribute, onSetSortDirection } = this.props;
    onSetSortDirection(attribute.id, dir);
  }

  private toggleFilter = () => {
    const { attribute, doFilter, onSetFilter } = this.props;
    if (doFilter) {
      onSetFilter(undefined);
    } else {
      onSetFilter(attribute.id, null);
    }
  }
}

export default HeaderCell;
