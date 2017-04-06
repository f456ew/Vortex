import * as React from 'react';

/**
 * interface of an icon within one of the icon bars
 * 
 * @export
 * @interface IIconDefinition
 */
export interface IIconDefinition {
  icon?: string;
  title?: string;
  component?: React.ComponentClass<any> | React.StatelessComponent<any>;
  props?: () => Object;
  action?: (instanceId: string | string[]) => void;
  condition?: (instanceId: string | string[]) => boolean;
  position?: number;
}
