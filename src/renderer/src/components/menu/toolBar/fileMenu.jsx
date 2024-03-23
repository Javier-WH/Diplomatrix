
import { useRef } from 'react';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import getSVGIcon from '../../../icons/iconList';

export default function FileMenu() {
  const menu = useRef(null);
  const items = [
    {
      label: 'File',
      icon: 'pi pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-plus',
          items: [
            {
              label: 'Document',
              icon: 'pi pi-file'
            },
            {
              label: 'Image',
              icon: 'pi pi-image'
            },
            {
              label: 'Video',
              icon: 'pi pi-video'
            }
          ]
        },
        {
          label: 'Open',
          icon: 'pi pi-folder-open'
        },
        {
          label: 'Print',
          icon: 'pi pi-print'
        }
      ]
    },
    {
      label: 'Edit',
      icon: 'pi pi-file-edit',
      items: [
        {
          label: 'Copy',
          icon: 'pi pi-copy'
        },
        {
          label: 'Delete',
          icon: 'pi pi-times'
        }
      ]
    },
    {
      label: 'Search',
      icon: 'pi pi-search'
    },
    {
      separator: true
    },
    {
      label: 'Share',
      icon: 'pi pi-share-alt',
      items: [
        {
          label: 'Slack',
          icon: 'pi pi-slack'
        },
        {
          label: 'Whatsapp',
          icon: 'pi pi-whatsapp'
        }
      ]
    }
  ];

  return (
    <>
      <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
      <Button icon={getSVGIcon("menu")} onClick={(e) => menu.current.toggle(e)} style={{width: "100%", height:"100%"}}/>
    </>

  )
}