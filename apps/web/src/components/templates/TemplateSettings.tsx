import { Grid, useMantineColorScheme } from '@mantine/core';
import { colors } from '../../design-system';
import { NotificationSettingsForm } from './NotificationSettingsForm';
import { TemplatesSideBar } from './TemplatesSideBar';
import { TriggerSnippetTabs } from './TriggerSnippetTabs';
import styled from '@emotion/styled';
import { useTemplateController } from './use-template-controller.hook';
import { ActivePageEnum } from '../../pages/templates/editor/TemplateEditorPage';

export const TemplateSettings = ({ activePage, setActivePage, showErrors, templateId }) => {
  const { colorScheme } = useMantineColorScheme();

  const { editMode, template, trigger } = useTemplateController(templateId);

  return (
    <div style={{ marginLeft: 12, marginRight: 12, padding: 17.5, minHeight: 500 }}>
      <Grid grow style={{ minHeight: 500 }}>
        <Grid.Col md={4} sm={6}>
          <SideBarWrapper dark={colorScheme === 'dark'} style={{ paddingRight: 50 }}>
            <TemplatesSideBar
              activeTab={activePage}
              changeTab={setActivePage}
              showTriggerSection={!!template && !!trigger}
              showErrors={showErrors}
            />
          </SideBarWrapper>
        </Grid.Col>
        <Grid.Col md={8} sm={6}>
          <div style={{ paddingLeft: 23 }}>
            {activePage === ActivePageEnum.SETTINGS && <NotificationSettingsForm editMode={editMode} />}

            {template && trigger && activePage === ActivePageEnum.TRIGGER_SNIPPET && (
              <TriggerSnippetTabs trigger={trigger} />
            )}
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

const SideBarWrapper = styled.div<{ dark: boolean }>`
  border-right: 1px solid ${({ dark }) => (dark ? colors.B20 : colors.BGLight)};
  height: 100%;
`;
