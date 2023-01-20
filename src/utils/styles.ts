import { BLUE, GRAY, BLACK } from './colors';
import { DEFAULT_PADDING } from './constants';
import { StyleSheet } from 'react-native';

export const GLOBAL_STYLES = StyleSheet.create({
  pageHeading: {
    fontSize: 30,
    fontWeight: "700",
    color: BLACK
  },
  container: {
    flex: 1,
    paddingHorizontal: DEFAULT_PADDING
  },
  pageHeadingBox: {
    marginTop: 70,
  },
  pageSubHeading: {
    color: GRAY
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  }
})