import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
  Camera, Heart, Github, AlignLeft, 
  User,
  Menu,
  PieChart,
  BarChart2,
  AlertTriangle,
  List,
  Server,
  Tool,
  Map,
  CheckCircle,
  MapPin,
  Folder,
  CheckSquare,
  Flag,
  Lock,
  Settings,
  PenTool,
  FileText
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Camera,
  Heart,
  Github,
  AlignLeft,
  User,
  Menu,
  PieChart,
  BarChart2,
  AlertTriangle,
  List,
  Server,
  Tool,
  Map,
  CheckCircle,
  MapPin,
  Folder,
  CheckSquare,
  Flag,
  Lock,
  Settings,
  PenTool,
  FileText
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }